import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";

import { locales } from "../_helpers/constants";

interface Props {
  children?: React.ReactNode;
  locale: (typeof locales)[number];
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const IntlProvider = ({ children, locale }: Props) => {
  const messages = useMessages();

  if (!messages) notFound();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

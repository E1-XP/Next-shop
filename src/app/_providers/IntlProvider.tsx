import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";

interface Props {
  children?: React.ReactNode;
  locale: string;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
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

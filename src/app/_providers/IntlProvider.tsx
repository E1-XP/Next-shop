"use client";

import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

interface Props {
  children?: React.ReactNode;
  locale: string;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

export const IntlProvider = async ({ children, locale }: Props) => {
  let messages;
  try {
    messages = (await import(`./../_i18n/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

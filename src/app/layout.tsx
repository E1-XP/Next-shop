import "./styles/globals.css";

import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Toast from "./components/Toast";

import { AuthProvider } from "./providers/AuthProvider";
import { TrpcQueryProvider } from "./providers/TrpcQueryProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--display-font",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--body-font",
});

export const metadata: Metadata = {
  title: "Next Shop",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} flex flex-col min-h-screen [&>footer]:mt-auto relative`}
      >
        <TrpcQueryProvider>
          <AuthProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <div id="modals" />
            <Toast />
          </AuthProvider>
        </TrpcQueryProvider>
      </body>
    </html>
  );
}

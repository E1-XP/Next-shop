"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface Props {
  session?: Session;
  children?: React.ReactNode;
}

export const AuthProvider = ({ children, session }: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

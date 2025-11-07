"use client";

import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};

export default function ClerkProviderClient({ children }: Props) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
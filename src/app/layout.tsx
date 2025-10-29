import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/app/ThemeProvider";
import QueryProvider from "@/providers/query-provider";
import ClerkProviderClient from "@/components/app/ClerkProviderClient";
import ScrollToTop from "@/components/app/ScrollToTop";
import LayoutShell from "@/components/app/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud Practice Test - Cloud Certification Quiz Platform",
  description: "Master AWS, Azure, and GCP certifications with our AI-powered quiz platform. Practice exams for Cloud Practitioner, Solutions Architect, Developer, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollToTop />
        <ClerkProviderClient>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <LayoutShell>{children}</LayoutShell>
            </QueryProvider>
          </ThemeProvider>
        </ClerkProviderClient>
      </body>
    </html>
  );
}

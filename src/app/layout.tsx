import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../assets/styles/globals.css";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { Loader } from "@/components/loader/loader.component";

import { Toaster } from "@/components/ui/toaster";

import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ClerkLoading>
              <Loader
                size="screen"
                spinnerProperties={{
                  size: "lg",
                }}
              />
            </ClerkLoading>
            <ClerkLoaded>
              {children}
              <Toaster />
            </ClerkLoaded>
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}

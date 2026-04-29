import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PaterHub - Monastery Life",
  description: "The finest monastery and abbey parody on localhost.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-black text-gray-200">
        {children}
      </body>
    </html>
  );
}

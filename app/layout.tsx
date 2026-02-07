// app/layout.tsx
import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import AOSInitializer from "@/components/AOSInitializer";

export const metadata: Metadata = {
  title: "शुभ विवाह",
  description: "विवाह आमंत्रण",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body className={inter.className}>
        <AOSInitializer />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/libs/tailwind";

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '700'],
});


export const metadata: Metadata = {
  title: "Movies",
  description: "Easy way to find a movie to watch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-poppins antialiased',
          poppins.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}

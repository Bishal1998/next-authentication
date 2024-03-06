import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Complete Authentication",
  description: "Complete Authentication with NextAuth",
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
          poppins.className,
          "min-h-screen w-full max-w-[1500px] mx-auto py-8 bg-white text-dark"
        )}
      >
        <Navbar />
        <div className="w-full max-w-[1420px] mx-auto">{children}</div>
      </body>
    </html>
  );
}

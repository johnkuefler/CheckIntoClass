import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Check Into Class",
  description: "Check Into Class",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" data-them="checkIntoClass">
      <body className={inter.className}>
        {session && <Navbar />}
        <div className="container mx-auto px-4 py-4">{children}</div>
      </body>
    </html>
  );
}

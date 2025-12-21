import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as requested or standard modern font
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ApniSec - Enterprise Cybersecurity Solutions",
  description: "Secure your digital infrastructure with ApniSec. We provide VAPT, Cloud Security, and Reteam Assessments to protect your business from modern threats.",
  keywords: ["cybersecurity", "VAPT", "cloud security", "penetration testing", "network security", "ApniSec"],
  authors: [{ name: "ApniSec Team" }],
  openGraph: {
    title: "ApniSec - Enterprise Cybersecurity Solutions",
    description: "Secure your digital infrastructure with ApniSec. We provide VAPT, Cloud Security, and Reteam Assessments.",
    type: "website",
    url: "https://apnisec.com",
    siteName: "ApniSec",
  },
  twitter: {
    card: "summary_large_image",
    title: "ApniSec - Enterprise Cybersecurity Solutions",
    description: "Protect your business with ApniSec's advanced cybersecurity services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}

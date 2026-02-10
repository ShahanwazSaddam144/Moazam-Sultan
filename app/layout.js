import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Moazzam Sultan - Math Teacher",
  description:
    "Moazzam Sultan is a passionate Math Teacher offering lessons and tutorials for students of all levels, helping them master algebra, calculus, geometry, and more.",
  keywords: "Math Teacher, Algebra, Geometry, Calculus, Online Math Lessons, Math Tutorials, Moazzam Sultan",
  authors: [{ name: "Moazzam Sultan", url: "https://moazzam-sultan.vercel.app" }],
  icons: {
    icon: "/logo.jpg",
  },
  openGraph: {
    title: "Moazzam Sultan - Math Teacher",
    description:
      "Master mathematics with Moazzam Sultan. Learn algebra, calculus, geometry, and more with personalized math lessons.",
    url: "https://moazzam-sultan.vercel.app",
    siteName: "Moazzam Sultan",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "Moazzam Sultan Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moazzam Sultan - Math Teacher",
    description:
      "Master mathematics with Moazzam Sultan. Learn algebra, calculus, geometry, and more.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

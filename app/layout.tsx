import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "BrainVibe | Redefining Neuro Detection & Brain Function Assessment",
  description:
    "Advanced non-invasive brain function assessments powered by 22Neuro. Quantitative QEEG brain mapping and HRV stress monitoring developed in collaboration with IIT Madras HTIC & SRMC.",
  keywords: [
    "BrainVibe",
    "22Neuro",
    "QEEG Brain Mapping",
    "Neurotechnology",
    "Stress Assessment",
    "HRV StressCheck",
    "IIT Madras HTIC",
    "Pune Healthcare",
  ],
};

import OfflineIndicator from "@/components/OfflineIndicator";
import SplashScreen from "@/components/SplashScreen";

import { BookingProvider } from "@/components/BookingProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#ebebed] text-slate-900 selection:bg-teal-600 selection:text-white">
        <SplashScreen />
        <BookingProvider>
          {children}
        </BookingProvider>
        <OfflineIndicator />
      </body>
    </html>
  );
}

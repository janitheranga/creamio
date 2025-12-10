import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/TopNavbar";
import BottomNavbar from "@/app/components/BottomNavbar";
import Footer from "@/app/components/Footer";
import NotificationBanner from "@/app/components/NotificationBanner";

export const metadata: Metadata = {
  title: "Creamio - Premium Dairy Products",
  description:
    "Fresh, nutritious, and delicious dairy products delivered to your doorstep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NotificationBanner />
        <Navbar />
        <BottomNavbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

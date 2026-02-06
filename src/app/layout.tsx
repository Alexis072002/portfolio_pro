import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MeshBackground } from "@/components/MeshBackground/MeshBackground";
import { Footer } from "@/components/Footer/Footer";
import { MainLayout } from "@/components/MainLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alexis | Web Full-stack Developer & UX Designer",
  description: "Professional portfolio of Alexis, a Full-stack Developer focusing on design, UX, and product thinking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <MeshBackground className="flex flex-col">
          <MainLayout>
            {children}
          </MainLayout>
          <Footer />
        </MeshBackground>
      </body>
    </html>
  );
}

import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
// Bitcount Single is a specialized font, if next/font/google doesn't have it, 
// we will use the CSS import in globals.css as specified by the user.
import "./globals.css";
import { MeshBackground } from "@/components/MeshBackground/MeshBackground";
import { Footer } from "@/components/Footer/Footer";
import { MainLayout } from "@/components/MainLayout";

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Alexis Dezeque | Junior Dev Front-end / Full-stack",
  description: "Portfolio d Alexis Dezeque, developpeur web junior front-end / full-stack. Projets, stack et methode de travail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
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

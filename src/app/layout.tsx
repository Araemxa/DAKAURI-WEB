import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DAKAURI - Dari Kami Untuk Negeri",
  description: "Organisasi mahasiswa UPJ yang berdedikasi untuk mengabdi kepada masyarakat melalui kegiatan sosial, pendidikan, dan pemberdayaan desa.",
  keywords: ["DAKAURI", "UPJ", "Universitas Pembangunan Jaya", "Mahasiswa", "Sosial", "Pendidikan"],
  authors: [{ name: "DAKAURI UPJ" }],
  openGraph: {
    title: "DAKAURI - Dari Kami Untuk Negeri",
    description: "Organisasi mahasiswa UPJ yang berdedikasi untuk mengabdi kepada masyarakat.",
    url: "https://dakauri.upj.ac.id",
    siteName: "DAKAURI",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${inter.variable} ${montserrat.variable} antialiased bg-[#0f0f0f] text-white`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

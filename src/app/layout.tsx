import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-be-vietnam",
});

const lora = Lora({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Hậu Sâm – Sức Khỏe Là Vàng",
  description: "Chuyên cung cấp sâm Ngọc Linh, sâm Lai Châu chính gốc Việt Nam. Chứng nhận nguồn gốc rõ ràng, chất lượng đảm bảo.",
  icons: {
    icon: [
      { url: "/logo_Sam-removebg-preview-removebg-preview.webp" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${beVietnamPro.className} ${lora.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

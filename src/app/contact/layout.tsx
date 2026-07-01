import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liên Hệ | Hậu Sâm",
  description: "Liên hệ Hậu Sâm để được tư vấn và báo giá sâm Ngọc Linh, sâm Lai Châu chính gốc. Phản hồi trong vòng 24 giờ.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const category = await prisma.category.create({
    data: { name: "Sâm tươi", slug: "sam-tuoi" },
  });


  await prisma.product.create({
    data: {
      name: "Sâm Ngọc Linh 20 năm tuổi",
      slug: "sam-ngoc-linh-20-nam-tuoi",
      description: "Sâm Ngọc Linh chính gốc, 20 năm tuổi, chứng nhận xuất xứ",
      price: 15000000,
      unit: "củ",
      isFeatured: true,
      categoryId: category.id,
    },
  });

  await prisma.post.create({
    data: {
      title: "Công dụng của Sâm Ngọc Linh với sức khỏe",
      slug: "cong-dung-cua-sam-ngoc-linh",
      excerpt: "Sâm Ngọc Linh được mệnh danh là quốc bảo của Việt Nam...",
      content: "Nội dung bài viết chi tiết tại đây...",
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  console.log("Seed xong!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
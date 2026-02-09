import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { products } from '../data/products';
import { stringifyJson } from '../lib/serialization';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@aurum.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword, role: 'admin' },
    create: {
      email: adminEmail,
      name: 'Aurum Admin',
      password: hashedPassword,
      role: 'admin'
    }
  });

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        currency: product.currency,
        images: stringifyJson(product.images),
        stock: product.stock,
        tags: stringifyJson(product.tags),
        rating: product.rating,
        brand: product.brand,
        variants: stringifyJson(product.variants)
      },
      create: {
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        currency: product.currency,
        images: stringifyJson(product.images),
        stock: product.stock,
        tags: stringifyJson(product.tags),
        rating: product.rating,
        brand: product.brand,
        variants: stringifyJson(product.variants)
      }
    });
  }

  const existingOrders = await prisma.order.count();
  if (existingOrders === 0) {
    await prisma.order.create({
      data: {
        status: 'paid',
        currency: 'USD',
        total: 1450,
        customer: stringifyJson({
          name: 'Sofia Reyes',
          email: 'sofia@example.com',
          address: '45 Rue Saint-Honoré, Paris'
        }),
        items: {
          create: [
            {
              productId: products[0].id,
              title: products[0].title,
              quantity: 1,
              price: products[0].price,
              options: stringifyJson({ Size: 'M', Color: 'Mist' })
            },
            {
              productId: products[3].id,
              title: products[3].title,
              quantity: 1,
              price: products[3].price,
              options: stringifyJson({ Storage: '256GB', Color: 'Onyx' })
            }
          ]
        }
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

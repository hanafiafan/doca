import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const FALLBACK_PRODUCTS = [
  { id: 'choco-melt', name: 'Choco Melt', description: 'Cokelat lumer premium yang manisnya pas.', price: 5000, image: '/images/oreo.png', color: '#8B5A2B', badge: 'Best Seller' },
  { id: 'cheese-lover', name: 'Cheese Lover', description: 'Keju parut melimpah di atas glaze keju manis.', price: 5000, image: '/images/cheese.png', color: '#F4A460', badge: 'Gurih Manis' },
  { id: 'tiramisu', name: 'Tiramisu', description: 'Kombinasi kopi dan krim khas tiramisu Italia.', price: 5000, image: '/images/tiramisu.png', color: '#CD853F', badge: 'Premium' },
  { id: 'matcha', name: 'Matcha Greentea', description: 'Rasa matcha asli yang wangi dan slightly bitter.', price: 5000, image: '/images/matcha.png', color: '#556B2F', badge: 'Favorite' },
  { id: 'strawberry', name: 'Strawberry', description: 'Selai strawberry segar dengan taburan meses.', price: 5000, image: '/images/strawberry.png', color: '#CD5C5C', badge: 'Fruity' },
  { id: 'taro', name: 'Taro', description: 'Manis unik khas talas ungu yang creamy.', price: 5000, image: '/images/taro.png', color: '#9370DB', badge: 'Unique' },
  { id: 'oreo', name: 'Oreo Crumb', description: 'Taburan biskuit Oreo renyah di atas glaze vanilla.', price: 5000, image: '/images/oreo.png', color: '#4F4F4F', badge: 'Crunchy' },
];

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products, using fallback:', error);
    return NextResponse.json(FALLBACK_PRODUCTS);
  }
}

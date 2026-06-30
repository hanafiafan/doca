import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// In-memory fallback for Vercel Serverless environment where SQLite is read-only
let memoryOrders = [];

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true,
        statusHistory: {
          orderBy: { timestamp: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const formattedOrders = orders.map(order => ({
      ...order,
      customer: {
        name: order.customerName,
        phone: order.customerPhone,
        address: order.customerAddress,
      }
    }));
    
    return NextResponse.json(formattedOrders.length > 0 ? formattedOrders : memoryOrders);
  } catch (error) {
    console.error('Error fetching orders, using fallback:', error);
    return NextResponse.json(memoryOrders);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const totalItems = data.items.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = data.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
    
    try {
      const newOrder = await prisma.order.create({
        data: {
          customerName: data.customer.name,
          customerPhone: data.customer.phone,
          customerAddress: data.customer.address,
          deliveryMethod: data.deliveryMethod,
          paymentMethod: data.paymentMethod,
          totalItems,
          totalPrice,
          status: 'pending',
          items: {
            create: data.items.map(item => ({
              productId: item.productId,
              qty: item.qty,
              price: item.price
            }))
          },
          statusHistory: {
            create: {
              status: 'pending'
            }
          }
        }
      });
      return NextResponse.json({ id: newOrder.id }, { status: 201 });
    } catch (prismaError) {
      // Fallback for Vercel SQLite Read-Only Error
      console.warn('Prisma create failed, falling back to memory storage:', prismaError.message);
      
      const fakeId = `DOCA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const fakeOrder = {
        ...data,
        id: fakeId,
        status: 'pending',
        createdAt: new Date().toISOString(),
        statusHistory: [{ status: 'pending', timestamp: new Date().toISOString() }],
        totalItems,
        totalPrice
      };
      memoryOrders = [fakeOrder, ...memoryOrders];
      
      return NextResponse.json({ id: fakeId }, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

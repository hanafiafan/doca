import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    
    // Transform to match the old frontend store structure
    const formattedOrders = orders.map(order => ({
      ...order,
      customer: {
        name: order.customerName,
        phone: order.customerPhone,
        address: order.customerAddress,
      }
    }));
    
    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Calculate total items and price
    const totalItems = data.items.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = data.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
    
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
      },
      include: {
        items: true,
        statusHistory: true
      }
    });

    return NextResponse.json({ id: newOrder.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

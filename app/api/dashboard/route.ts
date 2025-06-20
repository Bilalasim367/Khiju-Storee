// app/api/dashboard/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [totalVisitors, totalOrders, totalUsers, totalProducts] = await Promise.all([
      prisma.visitor.count(),
      prisma.customer_order.count(),
      prisma.user.count(),
      prisma.product.count(),
    ]);

    const totalSales = await prisma.customer_order.aggregate({
      _sum: {
        total: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        totalVisitors,
        totalOrders,
        totalUsers,
        totalProducts,
        totalSales: totalSales._sum.total || 0,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

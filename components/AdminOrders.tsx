"use client";

// *********************
// Role of the component: Component that displays all orders on admin dashboard page
// Name of the component: AdminOrders.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 - Redesigned by ChatGPT
// *********************

import React, { useEffect, useState } from "react";
import Link from "next/link";

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:3001/api/orders");
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="w-full px-4 sm:px-8 xl:ml-5 max-xl:mt-5">
      <h1 className="text-3xl font-bold text-black text-center mb-8">
        All Orders
      </h1>

      <div className="overflow-x-auto rounded-xl border border-[#e4dcd0] shadow-sm">
        <table className="min-w-full divide-y divide-[#e4dcd0] bg-[#FAF7F2]">
          <thead className="bg-[#f0eae2] text-black text-sm uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">
                <input type="checkbox" className="accent-black w-4 h-4" />
              </th>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Name & Country</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Subtotal</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#e4dcd0] text-sm">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-[#f5f0e6] transition-colors duration-150"
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" className="accent-black w-4 h-4" />
                  </td>
                  <td className="px-4 py-3 font-semibold text-black">#{order.id}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-black">{order.name}</p>
                      <p className="text-xs text-gray-600">{order.country}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-black">${order.total}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {new Date(order.dateTime).toDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-sm text-black underline hover:text-[#555] transition"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center px-4 py-10 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>

          <tfoot className="bg-[#f0eae2] text-black text-sm">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Name & Country</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Subtotal</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3"></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;

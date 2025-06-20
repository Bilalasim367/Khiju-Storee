"use client";

import { DashboardSidebar, StatsElement } from "@/components";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const dummyChartData = [
    { name: "Mon", visitors: 200 },
    { name: "Tue", visitors: 300 },
    { name: "Wed", visitors: 180 },
    { name: "Thu", visitors: 350 },
    { name: "Fri", visitors: 500 },
    { name: "Sat", visitors: 420 },
    { name: "Sun", visitors: 610 },
  ];

  return (
    <div className="bg-[#FAF7F2] flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col min-h-screen">
      <DashboardSidebar />

      <div className="flex flex-col items-center ml-5 gap-y-8 w-full max-xl:ml-0 max-xl:px-4 max-xl:mt-5 max-md:gap-y-5 py-8">
        {/* STATISTICS BLOCK */}
        <div className="flex justify-between w-full gap-x-4 max-md:flex-col max-md:gap-y-4">
          <StatsElement
            title="Total Products"
            value={stats?.totalProducts?.toString() || "-"}
            changePercent={5.2}
            isPositive={true}
          />
          <StatsElement
            title="Total Users"
            value={stats?.totalUsers?.toString() || "-"}
            changePercent={3.9}
            isPositive={true}
          />
          <StatsElement
            title="Total Orders"
            value={stats?.totalOrders?.toString() || "-"}
            changePercent={6.7}
            isPositive={true}
          />
        </div>

        {/* VISITOR CHART BLOCK */}
        <div className="w-full rounded-2xl bg-white border border-[#EADBC8] shadow-md p-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Visitor Trends This Week
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dummyChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visitors" fill="#EADBC8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* VISITOR COUNT CARD */}
        <div className="w-full rounded-2xl bg-black text-[#FAF7F2] h-44 flex flex-col justify-center items-center gap-y-3 shadow-lg">
          <h4 className="text-3xl font-semibold max-[400px]:text-2xl">Number of Visitors</h4>
          <p className="text-4xl font-bold text-[#EADBC8]">
            {stats?.totalVisitors?.toLocaleString() || "-"}
          </p>
          <p className="text-green-300 flex gap-x-2 items-center text-sm font-medium">
            <FaArrowUp />
            12.5% Since Last Month
          </p>
        </div>

        {/* LATEST ORDERS TABLE (Optional) */}
        <div className="w-full bg-white border border-[#E7E2D7] rounded-2xl p-6 shadow-md">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Latest Orders</h4>
          <table className="w-full text-sm">
            <thead className="text-left text-[#555] border-b border-[#eee]">
              <tr>
                <th className="py-2">Order ID</th>
                <th className="py-2">User</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#f0f0f0]">
                <td className="py-2">#987123</td>
                <td className="py-2">Ali Khan</td>
                <td className="py-2">Rs. 5,000</td>
                <td className="py-2 text-green-600">Completed</td>
              </tr>
              <tr className="border-b border-[#f0f0f0]">
                <td className="py-2">#987124</td>
                <td className="py-2">Sara B.</td>
                <td className="py-2">Rs. 3,200</td>
                <td className="py-2 text-yellow-600">Pending</td>
              </tr>
              {/* Add more rows dynamically later */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

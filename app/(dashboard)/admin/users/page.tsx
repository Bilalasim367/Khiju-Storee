"use client";
import { CustomButton, DashboardSidebar } from "@/components";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DashboardUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />

      <div className="w-full px-4 max-xl:px-2 max-xl:mt-5">
        <h1 className="text-3xl font-semibold text-center mb-6 text-black">
          All Users
        </h1>

        <div className="flex justify-end mb-5">
          <Link href="/admin/users/new">
            <CustomButton
              buttonType="button"
              customWidth="140px"
              paddingX={10}
              paddingY={5}
              textSize="base"
              text="Add New User"
            />
          </Link>
        </div>

        <div className="overflow-auto h-[75vh] rounded-xl border border-[#E7E2D7] bg-[#FAF7F2] shadow-sm">
          <table className="w-full min-w-[600px]">
            {/* Table Header */}
            <thead className="bg-black text-[#FAF7F2] text-left">
              <tr>
                <th className="p-4">
                  <input type="checkbox" className="accent-black h-4 w-4" />
                </th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4"></th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={nanoid()}
                    className="border-b border-[#E0E0E0] hover:bg-[#f1eeeb] transition"
                  >
                    <td className="p-4">
                      <input type="checkbox" className="accent-black h-4 w-4" />
                    </td>
                    <td className="p-4 text-black">{user?.email}</td>
                    <td className="p-4 text-gray-700 capitalize">{user?.role}</td>
                    <td className="p-4">
                      <Link
                        href={`/admin/users/${user?.id}`}
                        className="text-sm text-black border border-black px-3 py-1 rounded-md hover:bg-black hover:text-[#FAF7F2] transition"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>

            {/* Table Footer */}
            <tfoot className="bg-[#EAEAEA]">
              <tr>
                <th className="p-4"></th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4"></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;

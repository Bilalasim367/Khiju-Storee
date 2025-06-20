"use client";
import { DashboardSidebar } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DashboardCreateNewUser = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const addNewUser = () => {
    if (
      userInput.email.length > 3 &&
      userInput.role.length > 0 &&
      userInput.password.length > 0
    ) {
      if (!isValidEmailAddressFormat(userInput.email)) {
        toast.error("Invalid email address format.");
        return;
      }

      if (userInput.password.length > 7) {
        const requestOptions: RequestInit = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInput),
        };

        fetch(`http://localhost:3001/api/users`, requestOptions)
          .then((response) => {
            if (response.status === 201) {
              return response.json();
            } else {
              throw new Error("Error while creating user");
            }
          })
          .then(() => {
            toast.success("User added successfully!");
            setUserInput({ email: "", password: "", role: "user" });
          })
          .catch(() => {
            toast.error("Failed to create user.");
          });
      } else {
        toast.error("Password must be at least 8 characters.");
      }
    } else {
      toast.error("Please fill all fields.");
    }
  };

  return (
    <div className="bg-[#FAF7F2] flex justify-start max-w-screen-2xl mx-auto min-h-screen max-xl:flex-col max-xl:gap-y-6">
      <DashboardSidebar />

      <div className="flex flex-col gap-y-8 px-10 py-10 w-full max-xl:px-4">
        <h1 className="text-3xl font-bold text-black">Add New User</h1>

        {/* Email Input */}
        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium text-black mb-1">Email</label>
          <input
            type="email"
            placeholder="user@example.com"
            value={userInput.email}
            onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
            className="w-full border border-black rounded-md px-4 py-2 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password Input */}
        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium text-black mb-1">Password</label>
          <input
            type="password"
            placeholder="Min 8 characters"
            value={userInput.password}
            onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
            className="w-full border border-black rounded-md px-4 py-2 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Role Select */}
        <div className="w-full max-w-sm">
          <label className="block text-sm font-medium text-black mb-1">User Role</label>
          <select
            value={userInput.role}
            onChange={(e) => setUserInput({ ...userInput, role: e.target.value })}
            className="w-full border border-black rounded-md px-4 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Create Button */}
        <div>
          <button
            onClick={addNewUser}
            className="uppercase bg-black text-[#FAF7F2] px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-opacity-80 transition"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCreateNewUser;

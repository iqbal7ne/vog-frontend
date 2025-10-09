"use client";

import React from "react";
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

"use client";

import { ProblemTable } from "@/components/problem/table";
import { useProblems } from "@/hooks/useProblems";
import { useSession } from "next-auth/react";

export default function ProblemPage() {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const { data, isLoading, isError, refetch } = useProblems();

  if (isLoading) return <p className="p-6">Loading data...</p>;
  if (isError) return <p className="p-6 text-red-500">Gagal memuat data.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Daftar Problem</h1>
      <ProblemTable data={data ?? []} token={token} />
      <button
        onClick={() => refetch()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Refresh Data
      </button>
    </div>
  );
}

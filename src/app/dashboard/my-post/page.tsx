"use client";

import { MyProblemTable } from "@/components/myproblem/table";
import { ProblemTable } from "@/components/problem/table";
import { useMyPost } from "@/hooks/useProblems";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyPostPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const { data, isLoading, isError, refetch } = useMyPost();

  // 🔥 Redirect ke login kalau belum login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/"); // asumsi halaman login di "/"
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="p-6">Memeriksa sesi...</p>;
  }
  if (!token) return null; // biar tidak render sisa konten sementara
  if (isLoading) return <p className="p-6">Loading data...</p>;
  if (isError) return <p className="p-6 text-red-500">Gagal memuat data.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Post Problem</h1>
      <MyProblemTable data={data ?? []} token={token} />
      <button
        onClick={async () => {
          const res = refetch({ cancelRefetch: false });
          console.log("manual refetch result:", res);
        }}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Refresh Data
      </button>
    </div>
  );
}

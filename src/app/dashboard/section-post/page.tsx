"use client";

import { ProblemTable } from "@/components/problem/table";
import { useProblems } from "@/hooks/useProblems";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProblemPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const userTitle = (session as any)?.user?.title;
  const { data, isLoading, isError, refetch } = useProblems();

  // 🔥 Redirect ke login kalau belum login atau bukan manager/supervisor/staff
  const allowedTitles = ["manager", "supervisor", "staff"];
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/"); // asumsi halaman login di "/"
    }
    // Redirect users yang bukan manager/supervisor/staff ke dashboard
    if (
      status === "authenticated" &&
      userTitle &&
      !allowedTitles.includes(userTitle.toLowerCase())
    ) {
      router.replace("/dashboard");
    }
  }, [status, router, userTitle]);

  if (status === "loading") {
    return <p className="p-6">Memeriksa sesi...</p>;
  }
  if (!token) return null; // biar tidak render sisa konten sementara
  if (userTitle && !allowedTitles.includes(userTitle.toLowerCase()))
    return null; // prevent flash of content for non-authorized users
  if (isLoading) return <p className="p-6">Loading data...</p>;
  if (isError) return <p className="p-6 text-red-500">Gagal memuat data.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Daftar Problem</h1>
      <ProblemTable data={data ?? []} token={token} />
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

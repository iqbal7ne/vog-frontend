"use client";

import { ProblemTable } from "@/components/problem/table";
import { Problem } from "@/interface/vog";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

export default function EmployeesPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  // accessToken may be stored either on session.accessToken or session.user.accessToken
  const token =
    (session as any)?.accessToken ?? (session as any)?.user?.accessToken; // JWT dari NextAuth

  useEffect(() => {
    if (!token) return; // pastikan session sudah ada

    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8002/api/app/vog/problem",
          {
            headers: {
              Authorization: `Bearer ${token}`, // kirim token JWT
            },
          }
        );

        setData(res.data.data);
        console.log("ini respond api", res);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]); // dependensi pada token, bukan session langsung

  if (loading) return <div className="p-6">Loading...</div>;

  if (!token) return redirect("/login");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Page Section Post</h1>
      <ProblemTable data={data} token={token} />
    </div>
  );
}

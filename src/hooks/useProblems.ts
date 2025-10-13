import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Problem } from "@/interface/vog";

export function useProblems() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery<Problem[]>({
    queryKey: ["problems"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8002/api/app/vog/problem", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data?.data ?? res.data;
    },
    enabled: !!token, // hanya fetch kalau sudah login & token ada
    staleTime: 1000 * 60, // cache 1 menit
  });
}
export function useMyPost() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  return useQuery<Problem[]>({
    queryKey: ["mypost"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8002/api/app/vog/problem", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data?.data ?? res.data;
    },
    enabled: !!token, // hanya fetch kalau sudah login & token ada
    staleTime: 1000 * 60, // cache 1 menit
  });
}

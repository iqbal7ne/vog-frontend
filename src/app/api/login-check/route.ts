import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { NIK, PASSWORD } = body as { NIK?: string; PASSWORD?: string };

    if (!NIK || !PASSWORD) {
      return NextResponse.json(
        { ok: false, message: "NIK dan Password wajib diisi" },
        { status: 400 }
      );
    }

    const res = await axios.post(
      `${process.env.BACKEND_URL}/api/user/signin`,
      { NIK, PASSWORD },
      {
        headers: { "Content-Type": "application/json" },
        validateStatus: () => true,
      }
    );

    const raw: any = res?.data;

    if (res.status < 200 || res.status >= 300 || !raw?.data?.ACCESS_TOKEN) {
      const message = raw?.message || "Login gagal";
      return NextResponse.json(
        { ok: false, message, raw },
        { status: res.status || 400 }
      );
    }


    return NextResponse.json(
      { ok: true, message: raw?.message || "Login sukses" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("login-check error:", err);
    return NextResponse.json(
      { ok: false, message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

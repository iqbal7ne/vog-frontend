// components/login-form.tsx

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [NIK, setNIK] = useState("");
  const [PASSWORD, setPASSWORD] = useState("");
  const [error, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    // 1) Cek ke backend melalui route proxy untuk mendapat pesan yang jelas
    // let preRes: any = null;
    // let preStatus = 0;
    // try {
    //   const precheck = await axios.post(
    //     "/api/login-check",
    //     { NIK, PASSWORD },
    //     { validateStatus: () => true }
    //   );
    //   preRes = precheck?.data;
    //   preStatus = precheck?.status ?? 0;
    // } catch (e) {
    //   console.error("Failed to call /api/login-check:", e);
    // }

    // if (preStatus < 200 || preStatus >= 300 || !preRes?.ok) {
    //   setLoading(false);
    //   setErrorMessage(preRes?.message || "Login gagal");
    //   return;
    // }

    // 2) Login melalui NextAuth untuk set sesi
    const result = await signIn("credentials", {
      NIK,
      PASSWORD,
      redirect: false,
    });

    setLoading(false);

    if (result && result.error) {
      // Fallback jika NextAuth tetap mengembalikan error code
      console.error("Login error (NextAuth):", result.error);
      setErrorMessage("Login gagal");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Login to G-TIM APPS account</h1>
        <p className="text-muted-foreground text-xl text-balance">
          Enter your employee id below to login to your account
        </p>
      </div>

      <div className="grid gap-6 w-full max-w-xl mx-auto">
        <div className="grid gap-3">
          <Label className="text-xl" htmlFor="NIK">
            NIK
          </Label>
          <Input
            id="NIK"
            type="text"
            placeholder="EmployeeID"
            value={NIK}
            onChange={(e) => setNIK(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label className="text-xl" htmlFor="password">
              Password
            </Label>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={PASSWORD}
            onChange={(e) => setPASSWORD(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <a
          href="#"
          className="ml-auto text-xl underline-offset-4 hover:underline"
        >
          Forgot your password?
        </a>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <Button type="submit" className="bg-blue-600 w-full" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </Button>
      </div>
    </form>
  );
}

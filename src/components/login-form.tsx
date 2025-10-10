// components/login-form.tsx

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Popover } from "./ui/popover";
import { PopoverForgotPassword } from "./forgot-password";

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
    console.log("NIK:", NIK);

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
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="NIK">NIK</FieldLabel>
              <Input
                id="NIK"
                type="text"
                placeholder="12XXXXX"
                onChange={(e) => setNIK(e.target.value)}
                required
              />
            </Field>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <PopoverForgotPassword />
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPASSWORD(e.target.value)}
                required
              />
            </Field>
            <Field>
              <Button type="submit">Login</Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="#">ask to admin</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

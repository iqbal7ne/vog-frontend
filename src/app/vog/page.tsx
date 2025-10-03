"use client";

import { LoginForm } from "@/components/login-form";
import { VogForm } from "@/components/vog-form";
import { vogSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function page() {
  return (
    <div className="flex min-h-full w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <VogForm />
      </div>
    </div>
  );
}

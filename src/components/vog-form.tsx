import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { vogSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { vogForm } from "@/interface/vog";

export function VogForm() {
  const { area } = useParams<{ area: string | string[] }>();

  const decodedArea = Array.isArray(area)
    ? decodeURIComponent(area[0])
    : decodeURIComponent(area ?? "");

  // react hook form

  const form = useForm<vogForm>({
    resolver: zodResolver(vogSchema),
    defaultValues: {
      area: decodedArea,
      NIK: "",
      problem: "",
    },
  });

  const onSubmit = (data: vogForm) => {
    alert(data);
  };
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Voice Of Genba</CardTitle>
        <CardDescription>
          Informasikan kepada kami untuk membuat pekerjaan lebih baik, aman &
          nyaman
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="area">Area</Label>
              <Input
                id="area"
                type="text"
                placeholder="m@example.com"
                value={area}
                disabled
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="NIK">NIK</Label>
              <Input
                id="NIK"
                type="text"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="problem">Informasi</Label>
              <Textarea />
            </div>
            <Button type="submit" className="w-full">
              Kirim
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

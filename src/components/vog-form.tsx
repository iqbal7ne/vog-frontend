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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { vogSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { vogForm } from "@/interface/vog";

export function VogForm() {
  const searchParams = useSearchParams();
  const allowedAreas = [
    "CVT NC",
    "CVT Press",
    "Body Press",
    "welding line a",
    "welding line b",
    "welding line c",
    "welding line d",
    "SSW",
    "Logistik",
    "Receiving",
    "Delivery",
  ] as const;

  type AreaType = (typeof allowedAreas)[number];

  const areaParam = searchParams.get("area");
  const area: AreaType | undefined = allowedAreas.includes(
    areaParam as AreaType
  )
    ? (areaParam as AreaType)
    : undefined;

  // react hook form

  const form = useForm<vogForm>({
    resolver: zodResolver(vogSchema),
    defaultValues: {
      area: area,
      NIK: "",
      problem: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: vogForm) => {
    alert(JSON.stringify(data, null, 2));
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input placeholder="area" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="NIK"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input placeholder="NIK" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="problem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem</FormLabel>
                  <FormControl>
                    <Textarea placeholder="tell us the problem" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Kirim
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

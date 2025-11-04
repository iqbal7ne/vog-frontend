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
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { vogSchema } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { vogForm } from "@/interface/vog";
import axios from "axios";
import { Spinner } from "./ui/spinner";
import { debounce } from "@/helper/debounce";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { toast } from "sonner";

export function VogForm() {
  // initial state untuk cek queryparam
  const searchParams = useSearchParams();
  const areaParam = searchParams.get("area") ?? "";

  // State untuk validasi async
  const [isCheckingNIK, setIsCheckingNIK] = useState<boolean>(false);
  const [isNIKValid, setIsNIKValid] = useState<boolean | null>();

  const [isCheckingArea, setIsCheckingArea] = useState<boolean>(false);
  const [isAreaValid, setIsAreaValid] = useState<boolean | null>();
  //state tambahan untuk menyimpan nama area berdasarkan section_id
  const [areaName, setAreaName] = useState<string>("");

  // react hook form initialization
  const form = useForm<vogForm>({
    resolver: zodResolver(vogSchema),
    defaultValues: {
      SECTION_ID: areaParam,
      NIK: "",
      PROBLEM: "",
    },
    mode: "onChange",
  });
  const { setError, clearErrors, watch } = form; //di destructuring biar tidak menuliskan form.setError dan seterusnya
  const nikValue = watch("NIK");
  const areaValue = watch("SECTION_ID");

  // function untuk melakukan pengecheckan validasi AREA & NIK
  async function checkArea(SECTION_ID: string) {
    console.log("mulai cek area", SECTION_ID);
    try {
      const res = await axios.get(
        `http://192.168.100.75:8002/api/app/vog/area/${SECTION_ID}`
      );
      const data = res.data.data;
      console.log("data return area", data);
      if (!data) {
        setIsAreaValid(false);
        setAreaName("");
        setError("SECTION_ID", {
          message: "area tidak ditemukan, silahkan scan ulang",
        });
      } else {
        setIsAreaValid(true);
        setAreaName(data.SECTION_NAME || "");
        clearErrors("SECTION_ID");
      }
    } catch (err) {
      console.log(err);
      setError("SECTION_ID", { message: "error validasi area" });
    }
  }

  async function checkNIK(NIK: string) {
    console.log("mulai cek NIK", NIK);
    try {
      const res = await axios.get(
        `http://192.168.100.75:8002/api/app/vog/user/${NIK}`
      );
      const data = res.data.data;
      console.log("data return NIK", data);
      if (!data) {
        setIsNIKValid(false);
        setError("NIK", { message: "NIK tidak ditemukan" });
      } else {
        setIsNIKValid(true);
        clearErrors("NIK");
      }
    } catch (err) {
      setError("NIK", { message: "error validasi NIK" });
    }
  }

  //use effect untuk menjalankan fungsi validasi ketika nilai nya berubah
  // check NIK
  useEffect(() => {
    setIsNIKValid(null);
    if (!nikValue) {
      setIsCheckingNIK(false);
      return;
    }
    setIsCheckingNIK(true);

    const debounced = debounce(async (value: string) => {
      await checkNIK(value);
      setIsCheckingNIK(false);
    }, 600);

    debounced(nikValue);

    return () => debounced.cancel();
  }, [nikValue]);

  // CHECK AREA
  useEffect(() => {
    setIsAreaValid(null);
    if (!areaValue) {
      setIsCheckingArea(false);
      return;
    }
    setIsCheckingArea(true);

    const debounced = debounce(async (value: string) => {
      await checkArea(value);
      setIsCheckingArea(false);
    }, 600);

    debounced(areaValue);

    return () => debounced.cancel();
  }, [areaValue]);

  // handle submit nya menggunakan function ini (rekomendasi dari RHF untuk membuat function submit nya)
  const onSubmit = async (data: vogForm) => {
    // Pastikan validasi async sudah selesai
    if (isCheckingNIK || isCheckingArea) {
      alert("Tunggu validasi selesai dulu...");
      return;
    }

    if (!isNIKValid || !isAreaValid) {
      alert("NIK atau AREA tidak valid!");
      return;
    }

    const isValid = form.trigger();
    if (!isValid) {
      alert("Masih ada error pada form!");
      return;
    }
    const respon = await axios.post(
      `http://192.168.100.75:8002/api/app/vog/problem`,
      data
    );
    toast.success("Response submitted successfully");

    form.reset(); //reset form
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
              name="SECTION_ID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  {/* gunakan div ini agar spinner ketika validasi ada di samping input field */}
                  <div className="flex gap-1 items-center">
                    <FormControl>
                      <div className="flex">
                        <Input placeholder="area" {...field} hidden />
                      </div>
                    </FormControl>
                    <Input placeholder="" value={areaName} disabled />
                    {isCheckingArea ? (
                      <Spinner />
                    ) : isAreaValid === false ? (
                      <FcCancel />
                    ) : isAreaValid === true ? (
                      <FcCheckmark />
                    ) : null}
                  </div>
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
                  {/* gunakan div ini agar spinner ketika validasi ada di samping input field */}
                  <div className="flex gap-1 items-center">
                    <FormControl>
                      <Input placeholder="NIK" {...field} />
                    </FormControl>
                    {isCheckingNIK ? (
                      <Spinner />
                    ) : isNIKValid === false ? (
                      <FcCancel />
                    ) : isNIKValid === true ? (
                      <FcCheckmark />
                    ) : null}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PROBLEM"
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
            <Button
              type="submit"
              className="w-full"
              disabled={
                form.formState.isSubmitting ||
                !form.formState.isValid ||
                isCheckingArea ||
                isCheckingNIK
              }
            >
              {form.formState.isSubmitting ? "Mengirim..." : "Kirim"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

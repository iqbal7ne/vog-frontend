"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
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
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const token = session?.accessToken;
  const user = session?.user;
  const userNIK = (session as any)?.user?.id || user?.id;

  const [formData, setFormData] = useState({
    NIK: userNIK || "",
    EMP_NAME: user?.name || "",
    EMP_EMAIL: user?.email || "",
    PHONE: "",
    JOIN_DATE: "",
    TITLE: user?.title || "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Redirect jika belum login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  // Load user data saat pertama kali
  useEffect(() => {
    if (status === "authenticated" && token && userNIK) {
      loadUserData();
    }
  }, [status, token, userNIK]);

  const loadUserData = async () => {
    if (!userNIK || !token) return;

    try {
      // Try GET endpoint first (for VOG subsystem)
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userNIK}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.data) {
        const userData = res.data.data;
        setFormData({
          NIK: userData.NIK || userNIK,
          EMP_NAME: userData.EMP_NAME || user?.name || "",
          EMP_EMAIL: userData.EMP_EMAIL || user?.email || "",
          PHONE: userData.PHONE || "",
          JOIN_DATE: userData.JOIN_DATE
            ? new Date(userData.JOIN_DATE).toISOString().split("T")[0]
            : "",
          TITLE: userData.TITLE || user?.title || "",
        });
      }
    } catch (error: any) {
      console.error("Error loading user data:", error);
      // Fallback: try POST endpoint
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
          { NIK: userNIK },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (
          res.data?.data &&
          Array.isArray(res.data.data) &&
          res.data.data.length > 0
        ) {
          const userData = res.data.data[0];
          setFormData({
            NIK: userData.NIK || userNIK,
            EMP_NAME: userData.EMP_NAME || user?.name || "",
            EMP_EMAIL: userData.EMP_EMAIL || user?.email || "",
            PHONE: userData.PHONE || "",
            JOIN_DATE: userData.JOIN_DATE
              ? new Date(userData.JOIN_DATE).toISOString().split("T")[0]
              : "",
            TITLE: userData.TITLE || user?.title || "",
          });
        }
      } catch (fallbackError: any) {
        console.error("Fallback API call also failed:", fallbackError);
        // Fallback ke session data jika API gagal
        setFormData({
          NIK: userNIK || "",
          EMP_NAME: user?.name || "",
          EMP_EMAIL: user?.email || "",
          PHONE: "",
          JOIN_DATE: "",
          TITLE: user?.title || "",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/upd`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status >= 200 && res.status < 300) {
        toast.success("Profile berhasil diupdate");

        // Update session dengan data baru
        await update({
          ...session,
          user: {
            ...session?.user,
            name: formData.EMP_NAME,
            email: formData.EMP_EMAIL,
            title: formData.TITLE,
          },
        });

        setIsEditing(false);
      } else {
        throw new Error(res.data?.message || "Update gagal");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Gagal mengupdate profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (status === "loading") {
    return <div className="p-6">Memuat data...</div>;
  }

  if (!token || !user) {
    return null;
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile Saya</CardTitle>
              <CardDescription>
                Kelola informasi profil dan akun Anda
              </CardDescription>
            </div>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="NIK">NIK</FieldLabel>
                <Input
                  id="NIK"
                  name="NIK"
                  value={formData.NIK}
                  disabled
                  className="bg-muted"
                />
                <FieldDescription>NIK tidak dapat diubah</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="EMP_NAME">Nama</FieldLabel>
                <Input
                  id="EMP_NAME"
                  name="EMP_NAME"
                  value={formData.EMP_NAME}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="EMP_EMAIL">Email</FieldLabel>
                <Input
                  id="EMP_EMAIL"
                  name="EMP_EMAIL"
                  type="email"
                  value={formData.EMP_EMAIL}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="PHONE">Nomor Telepon</FieldLabel>
                <Input
                  id="PHONE"
                  name="PHONE"
                  type="tel"
                  value={formData.PHONE}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="081234567890"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="JOIN_DATE">Tanggal Bergabung</FieldLabel>
                <Input
                  id="JOIN_DATE"
                  name="JOIN_DATE"
                  type="date"
                  value={formData.JOIN_DATE}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="TITLE">Jabatan</FieldLabel>
                <Input
                  id="TITLE"
                  name="TITLE"
                  value={formData.TITLE}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Manager, Supervisor, Staff, dll"
                />
              </Field>

              {isEditing && (
                <Field>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        loadUserData(); // Reset form
                      }}
                      disabled={isLoading}
                    >
                      Batal
                    </Button>
                  </div>
                </Field>
              )}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

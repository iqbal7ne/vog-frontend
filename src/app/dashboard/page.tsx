"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant={"destructive"} onClick={handleSubmit}>
          Logout
        </Button>
      </div>
      <div className="gap-5 w-full grid grid-cols-2">
        <Link href="/dashboard/my-post">
          <Card className=" bg-gradient-to-t from-primary from-0% via-background via-20% hover:border-ring border-2 ">
            <CardContent className="text-center">My Post</CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/my-post">
          <Card className="bg-gradient-to-t from-primary from-0% via-background via-20% hover:border-ring border-2">
            <CardContent className="text-center">Section Post</CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

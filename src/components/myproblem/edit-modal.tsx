"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Employee, Problem } from "@/interface/vog";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

type EditProblemModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  problem: Problem | null;
  token?: string;
};

export function EditProblemModal({
  open,
  onOpenChange,
  problem,
  token,
}: EditProblemModalProps) {
  const [formData, setFormData] = useState<Partial<Problem>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (problem) {
      setFormData(problem);
    }
  }, [problem]);

  const handleSave = async () => {
    console.log("Saving data:", formData);
    console.log("ini token di edit model: ", token);
    setLoading(true);
    // Implement the logic to save the data to the server
    try {
      await axios.post(
        "http://localhost:8002/api/app/vog/response", // api url nya
        // formData, //body data nya kalau mau kirim semua
        // dan di bawah ini kalau mau kirimnya tidak semua
        {
          RESPONSE: formData.RESPONSE,
          PROBLEM_ID: formData.PROBLEM_ID,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, //token nya
          },
        }
      );
      toast.success("Response submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["problems"] }); // 🔥 Auto refetch global
      onOpenChange(false); //jika berhasil, tutup modal dengan memberikan nilai false
    } catch (error) {
      console.error(error);
      toast.error("Failed to save data", {
        description: "An error occurred",
      });
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Submit Response</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className=" flex gap-2">
            <Label>Employee Name</Label>
            <Input value={formData.EMP_NAME ?? ""} disabled />
          </div>
          <div className="grid col-1 gap-3">
            <Label>Problem</Label>
            <Textarea value={formData.PROBLEM ?? ""} disabled />
          </div>
          <div className="grid col-1 gap-3">
            <Label>Response</Label>
            <Textarea
              value={formData.RESPONSE ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, RESPONSE: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

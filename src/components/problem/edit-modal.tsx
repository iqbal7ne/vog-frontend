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

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  problem: Problem | null;
  token: string;
};

export function EditProblemModal({
  open,
  onOpenChange,
  problem,
  token,
}: Props) {
  const [formData, setFormData] = useState<Partial<Problem>>({});

  useEffect(() => {
    if (problem) setFormData(problem);
  }, [problem]);

  const handleSave = async () => {
    console.log("Saving data:", formData);
    console.log("ini token di edit model: ", token);

    // Implement the logic to save the data to the server
    const res = await axios.post(
      "http://localhost:8002/api/app/vog/response",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    onOpenChange(false);
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
          <Button onClick={handleSave}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  problem: Problem | null;
};

export function EditProblemModal({ open, onOpenChange, problem }: Props) {
  const [formData, setFormData] = useState<Partial<Problem>>({});

  useEffect(() => {
    if (problem) setFormData(problem);
  }, [problem]);

  const handleSave = () => {
    console.log("Saving data:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Edit Problem</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>Employee Name</Label>
            <Input value={formData.EMP_NAME ?? ""} disabled />
          </div>
          <div>
            <Label>Problem</Label>
            <Input value={formData.PROBLEM ?? ""} disabled />
          </div>
          <div>
            <Label>Response</Label>
            <Input
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
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

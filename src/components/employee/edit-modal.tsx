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
import { Employee } from "@/interface/vog";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee | null;
};

export function EditEmployeeModal({ open, onOpenChange, employee }: Props) {
  const [formData, setFormData] = useState<Partial<Employee>>({});

  useEffect(() => {
    if (employee) setFormData(employee);
  }, [employee]);

  const handleSave = () => {
    console.log("Saving data:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Edit Employee</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>NIK</Label>
            <Input value={formData.NIK ?? ""} disabled />
          </div>
          <div>
            <Label>Name</Label>
            <Input
              value={formData.EMP_NAME ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, EMP_NAME: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Title</Label>
            <Input
              value={formData.TITLE ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, TITLE: e.target.value })
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

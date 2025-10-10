"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Employee } from "@/interface/vog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditEmployeeModal } from "./edit-modal";
import { useState } from "react";

type Props = {
  data: Employee[];
};

export function EmployeeTable({ data }: { data: Employee[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);

  const table = useReactTable({
    data,
    columns: columns((emp) => {
      setSelected(emp);
      setOpen(true);
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <EditEmployeeModal
        open={open}
        onOpenChange={setOpen}
        employee={selected}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

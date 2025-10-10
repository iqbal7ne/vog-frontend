"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import { Employee, Problem } from "@/interface/vog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditProblemModal } from "./edit-modal";
import { useState } from "react";

type Props = {
  data: Problem[];
  token: string;
};
export function ProblemTable({ data, token }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Problem | null>(null);

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
      <EditProblemModal
        open={open}
        onOpenChange={setOpen}
        problem={selected}
        token={token}
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

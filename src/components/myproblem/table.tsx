"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./columns";
import {
  MyProblem,
  MyProblemTableProps,
  Problem,
  ProblemTableProps,
} from "@/interface/vog";
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

export function MyProblemTable({ data, token }: MyProblemTableProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<MyProblem | null>(null);

  const table = useReactTable({
    data,
    columns: columns((dataProblem) => {
      setSelected(dataProblem);
      setOpen(true);
    }),
    getCoreRowModel: getCoreRowModel(),
  });

  // const handleClose = (success?: boolean) => {
  //   setOpen(false);
  //   if (success) {
  //     refetch(); //hanya refetch kalau edit berhasil
  //   }
  // };
  return (
    <>
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="text-center py-4 text-muted-foreground"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

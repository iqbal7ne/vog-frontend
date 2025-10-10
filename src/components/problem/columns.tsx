"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Employee, Problem } from "@/interface/vog";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

export const columns = (
  onEdit: (problem: Problem) => void
): ColumnDef<Problem>[] => [
  {
    accessorKey: "PROBLEM_ID",
    header: "PROBLEM_ID",
  },
  {
    accessorKey: "SECTION_ID",
    header: "SECTION_ID",
  },
  {
    accessorKey: "NIK",
    header: "NIK",
  },
  {
    accessorKey: "EMP_NAME",
    header: "Employee Name",
  },
  {
    accessorKey: "STATUS",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.STATUS;
      return status ? (
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full"
        >
          {status}
        </Badge>
      ) : (
        <Badge variant="outline" className="text-gray-500 border-gray-300">
          No Title
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button variant="outline" size="sm" onClick={() => onEdit(row.original)}>
        Edit
      </Button>
    ),
  },
];

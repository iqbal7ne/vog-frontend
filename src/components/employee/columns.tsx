"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Employee } from "@/interface/vog";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

export const columns = (
  onEdit: (employee: Employee) => void
): ColumnDef<Employee>[] => [
  {
    accessorKey: "NIK",
    header: "NIK",
  },
  {
    accessorKey: "EMP_NAME",
    header: "Name",
  },
  {
    accessorKey: "TITLE",
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.TITLE;
      return title ? (
        <Badge
          variant="secondary"
          className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full"
        >
          {title}
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

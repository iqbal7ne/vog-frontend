"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Employee, Problem } from "@/interface/vog";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";

export const columns = (
  onEdit: (problem: Problem) => void
): ColumnDef<Problem>[] => [
  {
    accessorKey: "NIK",
    header: "NIK",
  },
  {
    accessorKey: "EMP_NAME",
    header: "Employee Name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "PROBLEM",
    header: "Problem",
    cell: ({ row }) => {
      const problem = row.original.PROBLEM;
      return <Textarea value={problem} disabled />;
    },
  },
  {
    accessorKey: "SECTION_ID",
    header: "Area Founded",
  },
  {
    accessorKey: "STATUS",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.STATUS;
      return status ? (
        <Badge variant={"destructive"} className="">
          OPEN
        </Badge>
      ) : (
        <Badge variant="default" className="">
          CLOSE
        </Badge>
      );
    },
  },
  {
    accessorKey: "RESPONSE_BY",
    header: "Response By",
  },
  {
    accessorKey: "EMP_NAME_RESPONSE",
    header: "Response Name",
  },
  {
    accessorKey: "RESPONSE",
    header: "Response",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button variant="outline" size="sm" onClick={() => onEdit(row.original)}>
        Response
      </Button>
    ),
  },
];

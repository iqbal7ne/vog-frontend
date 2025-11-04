"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Employee, MyProblem, Problem } from "@/interface/vog";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";

export const columns = (
  onEdit: (problem: MyProblem) => void
): ColumnDef<MyProblem>[] => [
  {
    accessorKey: "PROBLEM_ID",
    header: "PROBLEM_ID",
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
      return (
        <Badge variant={status ? "destructive" : "default"} className="">
          {status ? "OPEN" : "CLOSE"}
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
];

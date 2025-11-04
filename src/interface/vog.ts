import z from "zod";
import { vogSchema } from "@/schema/schema";

export type vogForm = z.infer<typeof vogSchema>;

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
}

export type Employee = {
  NIK: string;
  EMP_NAME: string;
  EMP_EMAIL: string | null;
  PHONE: string | null;
  PASSWORD: string;
  JOIN_DATE: string;
  END_DATE: string | null;
  TITLE: string | null;
  LAST_UPDATED: string;
  UPDATED_BY: string | null;
};
export type Problem = {
  PROBLEM_ID: number;
  PROBLEM: string;
  NIK: string;
  EMP_NAME: string;
  RESPONSE_BY: string | null;
  EMP_NAME_RESPONSE: string | null;
  RESPONSE: string | null;
  CREATED_DATE: string;
  LAST_UPDATED: string;
  STATUS: boolean;
  SECTION_ID: string;
};
export type MyProblem = {
  PROBLEM_ID: number;
  PROBLEM: string;
  NIK: string;
  SECTION_ID: string;
  RESPONSE_BY: string | null;
  RESPONSE: string | null;
  STATUS: boolean;
  CREATED_DATE: string;
  LAST_UPDATED: string;
};

export interface ProblemTableProps {
  data: Problem[];
  token?: string;
}
export interface MyProblemTableProps {
  data: MyProblem[];
  token?: string;
}

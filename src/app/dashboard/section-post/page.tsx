import { EmployeeTable } from "@/components/employee/table";
import { ProblemTable } from "@/components/problem/table";
import { Employee, Problem } from "@/interface/vog";

const data: Problem[] = [
  {
    PROBLEM_ID: 6,
    PROBLEM: "HERU",
    NIK: "1304005",
    EMP_NAME: "HERU SUGIANTO",
    RESPONSE_BY: null,
    EMP_NAME_RESPONSE: null,
    RESPONSE: null,
    CREATED_DATE: "2025-10-10T03:56:00.343Z",
    LAST_UPDATED: "2025-10-10T03:56:00.343Z",
    STATUS: true,
    SECTION_ID: "PPIC",
  },
  {
    PROBLEM_ID: 1,
    PROBLEM: "A",
    NIK: "1309052",
    EMP_NAME: "M. IQBAL FATONI",
    RESPONSE_BY: null,
    EMP_NAME_RESPONSE: null,
    RESPONSE: null,
    CREATED_DATE: "2025-10-07T09:13:02.968Z",
    LAST_UPDATED: "2025-10-07T09:13:02.968Z",
    STATUS: true,
    SECTION_ID: "BPR",
  },
  {
    PROBLEM_ID: 2,
    PROBLEM: "a",
    NIK: "1309052",
    EMP_NAME: "M. IQBAL FATONI",
    RESPONSE_BY: null,
    EMP_NAME_RESPONSE: null,
    RESPONSE: null,
    CREATED_DATE: "2025-10-07T09:17:31.055Z",
    LAST_UPDATED: "2025-10-07T09:17:31.055Z",
    STATUS: true,
    SECTION_ID: "BPR",
  },
];

export default function EmployeesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Page my post</h1>
      <ProblemTable data={data} />
    </div>
  );
}

import { EmployeeTable } from "@/components/employee/table";
import { Employee } from "@/interface/vog";

const data: Employee[] = [
  {
    NIK: "1211024",
    EMP_NAME: "Asep Arif Nurahman",
    EMP_EMAIL: null,
    PHONE: null,
    PASSWORD: "$2b$10$InfDvnFcJmFeROWxFWUNkemftfSbYC39CVE4SReA5MH5iDZPtwjke",
    JOIN_DATE: "2012-10-31T17:00:00.000Z",
    END_DATE: null,
    TITLE: null,
    LAST_UPDATED: "2025-10-02T07:52:57.621Z",
    UPDATED_BY: null,
  },
  {
    NIK: "1208007",
    EMP_NAME: "ARIS PURBOWO",
    EMP_EMAIL: null,
    PHONE: null,
    PASSWORD: "$2b$10$BxMajNSKUVpj.614m3xDRuD4u.64vif1B6zKiyI9gx8duEbyk/xEy",
    JOIN_DATE: "2012-08-11T17:00:00.000Z",
    END_DATE: null,
    TITLE: null,
    LAST_UPDATED: "2025-10-02T07:52:57.626Z",
    UPDATED_BY: null,
  },
  {
    NIK: "1301043",
    EMP_NAME: "TANTI HERLINA",
    EMP_EMAIL: null,
    PHONE: null,
    PASSWORD: "$2b$10$SiQmYKfGXJRwAZzkkd/gSeFEyzAXqgcAVMD7s4NIPqBsGDDMr8nyi",
    JOIN_DATE: "2013-01-01T17:00:00.000Z",
    END_DATE: null,
    TITLE: "Staff",
    LAST_UPDATED: "2025-10-02T07:52:57.665Z",
    UPDATED_BY: null,
  },
];

export default function EmployeesPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Page my post</h1>
      <EmployeeTable data={data} />
    </div>
  );
}

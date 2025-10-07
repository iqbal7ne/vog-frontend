import { z } from "zod";
import axios from "axios";

// const allowedAreas = [
//   "CVT NC",
//   "CVT Press",
//   "Body Press",
//   "welding line a",
//   "welding line b",
//   "welding line c",
//   "welding line d",
//   "SSW",
//   "Logistik",
//   "Receiving",
//   "Delivery",
// ] as const;

async function getUsers(nik: string) {
  try {
    const res = await axios.get(`http://192.168.100.75:8002/api/user/${nik}`);
    const data = res.data.data; //karena return dari api adalah object yang memiliki "data", lalu data adalah object yang memiliki "message" & "data", lalu data adalah array object dari hasil pencarian database
    if (!data) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error validateNIK", error);
    return false; // kalau error anggap tidak valid
  }
}

async function validateNIK(nik: string) {
  const data = await getUsers(nik);
  console.log("ini return data getusers", data);
  return data;
}

export const vogSchema = z.object({
  SECTION_ID: z.string().min(1, "Area wajib diisi, silahkan scan ulang"),
  NIK: z.string().min(7).max(7).regex(/^\d+$/, "NIK hanya boleh angka"),
  PROBLEM: z.string().min(1, "problem harus terisi"),
});

"use server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
// export const insert = async (e: any) => {
//   const tet = await bcrypt.hash(e.password, 10);
//   await prisma.admin.update{

//   }
// };

type login = {
  email: string;
  password: string;
};
export const login = async (c: login) => {
  const admin = await prisma.admin.findUnique({
    where: {
      email: c.email,
    },
  });
  if (!admin) {
    return false;
  }

  const match = await bcrypt.compare(c.password, admin.password);
  if (!match) {
    return false;
  }
  return true;
};

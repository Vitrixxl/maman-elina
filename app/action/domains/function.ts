"use server";

import prisma from "../../../lib/prisma";

export const getDomains = async () => {
  if (!prisma) return;
  return await prisma.domain.findMany();
};

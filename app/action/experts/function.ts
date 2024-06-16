"use server";

import prisma from "../../../lib/prisma";
import { Expert } from "@/types";

import { revalidatePath } from "next/cache";
// export const addExpert = (expert: Expert) => {
//   if (!prisma) return;
//   expert.experience = Number(expert.experience);
//   expert.tags = [expert.tags.toString()];
//   expert.languages = [expert.languages.toString()];
//   return prisma.expert.create({
//     data: expert,
//   });

export const getExperts = async () => {
  if (!prisma) return;

  const experts: Expert[] = await prisma.expert.findMany({
    include: {
      location: true,
      domain: true,
      languages: true,
    },
  });
  return experts;
};
export const getLocations = async () => {
  if (!prisma) return;
  return prisma.location.findMany();
};
export const getDomains = async () => {
  if (!prisma) return;
  return prisma.domain.findMany();
};
export const getLanguages = async () => {
  if (!prisma) return;
  return prisma.language.findMany();
};
type RequiredExpert = {
  firstName: string;
  lastName: string;
  email: string;
  domainId: string;
  locationId: string;
  experience: number;
  tags: string[];
  languages: string[];
  caption: string | null;
};

export const insertExpert = async (expert: Expert) => {
  console.log("Insertion de l'expert:", expert);

  if (
    !expert.firstName ||
    !expert.lastName ||
    !expert.experience ||
    !expert.locationId ||
    !expert.email ||
    !expert.languages.length ||
    !expert.domainId
  ) {
    throw new Error(
      "Un ou plusieurs champs requis sont manquants ou invalides.",
    );
  }
  try {
    const newExpert = await prisma.expert.create({
      data: {
        firstName: expert.firstName,
        lastName: expert.lastName,
        experience: expert.experience,
        location: {
          connect: { id: expert.locationId },
        },

        email: expert.email,
        languages: {
          connect: expert.languages.map((id) => ({ id })),
        },
        tags: expert.tags,
        domain: {
          connect: { id: expert.domainId },
        },
        caption: expert.caption == null ? "" : expert.caption,
        job: expert.job,
      },
    });

    console.log("Nouvel expert inséré:", newExpert);
  } catch (error) {
    console.error("Erreur lors de l'insertion de l'expert:", error);
  } finally {
    await prisma.$disconnect();
  }
  revalidatePath("/admin");
};

export const insertTest = async () => {};
export const deleteExpert = async (id: string) => {
  try {
    await prisma.expert.delete({
      where: { id: id },
    });
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
  }
};

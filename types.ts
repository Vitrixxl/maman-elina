import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type typeLink = {
  href: string;
  label: string;
  subLinks?: { href: string; label: string }[];
};

export type typeExpert = {
  id: string;
  name: string;
  description: string;
  img?: string;
  rating: number;
  reviews: number;
  domain: string;
  location: string;
  price: number;
  keys: string[];
};

import { Expert as PrismaExpert } from "@prisma/client";

// Définition d'un type étendu pour inclure les champs retournés par Prisma
export interface Expert extends PrismaExpert {
  location: {
    id: string;
    name: string;
  };
  domain: {
    id: string;
    name: string;
  };
  languages: {
    id: string;
    name: string;
  }[];
}
export type Location = {
  id: string;
  name: string;
};

export type Domain = {
  id: string;
  name: string;
};

export type Language = {
  id: string;
  name: string;
};

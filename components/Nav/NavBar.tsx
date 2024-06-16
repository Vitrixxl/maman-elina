"use server";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { typeLink } from "../../types";
import { Input, Button } from "@nextui-org/react";
import { SearchIcon } from "../Icons/SearchIcon";
import { MailIcon } from "../Icons/MailIcon";
import ThemeButton from "../SwitchTheme";
import NavSearch from "./NavSearch";
const links = new Set<typeLink>([
  { href: "/", label: "Accueil" },
  {
    href: "/experts",
    label: "Nos experts",
    subLinks: [
      { href: "experts/it", label: "Informatique" },
      { href: "experts/", label: "" },
      { href: "experts/", label: "" },
      { href: "experts/", label: "" },
    ],
  },
  { href: "/reseau", label: "Notre reseau" },
]);
import { getExperts, getDomains } from "@/app/action/experts/function";
import { NavbarMenuToggle } from "@nextui-org/react";
import BurgerMenu from "./Burger";
import Link from "next/link";
import MailModal from "./MailModal";
export default async function NavBar() {
  const experts = await getExperts();
  const domains = await getDomains();
  if (!experts || !domains) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-default bg-background transition-all">
      <div className="relative z-50 w-full">
        <ul className="m-auto flex h-16 max-w-8xl items-center justify-between gap-4 pl-2 md:h-20 md:px-4 lg:px-6">
          <li className="">
            <Link
              href={"/"}
              className="mr-2 flex items-center gap-1 rounded-full bg-foreground p-1 md:bg-transparent"
            >
              <Image
                src={"/LogoV.png"}
                alt=""
                width={0}
                height={0}
                unoptimized
                className="size-8 md:size-12"
              />
              <h1 className="block px-1 text-sm font-semibold text-background-200 xs:text-lg sm:px-2 md:hidden">
                Mon reseau d'affaires
              </h1>
            </Link>
          </li>
          <li className="hidden h-full flex-grow flex-row-reverse justify-between md:flex md:flex-row">
            <NavLinks domains={domains} />

            <div className="flex h-full items-center gap-2">
              <ThemeButton />
              <MailModal />
            </div>
          </li>

          <li className="relative z-50 hidden h-full items-center sm:flex">
            <NavSearch DBexperts={experts} DBdomains={domains} />
          </li>
          <li className="mr-4 flex h-full items-center md:hidden">
            <BurgerMenu domains={domains} />
          </li>
        </ul>
      </div>
    </header>
  );
}

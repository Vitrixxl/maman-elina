"use client";
import Link from "next/link";
import { Domain, typeLink } from "@/types";
import { linksData } from "./data";
import { usePathname } from "next/navigation";
export default function NavLinks({
  domains,
}: {
  domains: Domain[] | undefined;
}) {
  const curPath = usePathname();

  return (
    <ul className="hidden h-full gap-4 py-4 md:flex">
      <li className="fl navlink flex h-full items-center">
        <Link
          href={"/"}
          className={
            ("/" == curPath ? "text-primary" : "text-inherit") +
            " font-t text-xl font-medium"
          }
        >
          Accueil
        </Link>
      </li>
      <li className="fl navlink relative flex h-full items-center">
        <Link
          href={"/experts"}
          className={
            ("/experts" == curPath ? "text-primary" : "text-inherit") +
            " font-t text-xl font-medium"
          }
        >
          Experts
        </Link>
        <ul className="absolute left-0 top-full z-50 hidden w-max flex-col overflow-hidden rounded-lg border border-default bg-background shadow-lg">
          {domains &&
            domains.map((domain, i) => (
              <li
                key={i}
                className="flex w-full flex-col gap-2 transition-all hover:bg-primary hover:text-foreground"
              >
                <Link
                  href={"/experts?domain=" + domain.name}
                  className="font-t w-full px-4 py-2 text-foreground transition-all hover:text-white"
                >
                  {domain.name}
                </Link>
              </li>
            ))}
        </ul>
      </li>
      <li className="fl navlink flex h-full items-center">
        <Link
          href={"/notre-reseau"}
          className={
            ("/le-reseau" == curPath ? "text-primary" : "text-inherit") +
            " font-t text-xl font-medium"
          }
        >
          Notre reseau
        </Link>
      </li>
      {/* {domains &&
        domains.map((link, i) => (
          <li key={i} className="fl navlink relative flex h-full items-center">
            <Link
              href={link.href}
              className={
                (link.href == curPath ? "text-primary" : "text-inherit") +
                " font-t text-xl font-medium"
              }
            >
              {link.label}
            </Link>
            {link.subLinks && (
              <ul className="absolute left-0 top-full z-50 hidden w-max flex-col overflow-hidden rounded-lg border border-default bg-background shadow-lg">
                {link.subLinks.map((subLink, i) => (
                  <li
                    key={i}
                    className="flex w-full flex-col gap-2 transition-all hover:bg-primary hover:text-foreground"
                  >
                    <Link
                      href={subLink.href}
                      className="font-t w-full px-4 py-2 text-foreground transition-all hover:text-white"
                    >
                      {subLink.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))} */}
    </ul>
  );
}

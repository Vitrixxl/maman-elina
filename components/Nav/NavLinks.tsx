"use client";
import Link  from "next/link";
import { typeLink } from "@/types";
import { linksData } from "./data";
import { usePathname } from "next/navigation";
export default function NavLinks() {
    const curPath = usePathname()
    return (

        <ul className="flex gap-4 py-4 h-full">

            {Array.from(linksData).map((link, i) => (
                <>

                    <li key={i} className="relative flex items-center h-full fl navlink">
                        <Link href={link.href} className={(link.href == curPath ? "text-primary" : " text-inherit ") + " text-xl font-t font-medium "}>{link.label}</Link>
                        {link.subLinks && (
                            <ul className="top-full left-0 z-50 absolute flex-col gap-2 border-default hidden bg-background shadow-lg py-2 border rounded-lg rounded-tl-none w-max">
                                {link.subLinks.map((subLink, i) => (
                                    <li key={i} className="flex flex-col gap-2 px-4 w-full">
                                        <Link href={subLink.href} className="w-full font-t text-foreground hover:text-primary transition-all">{subLink.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                </>
            ))}
        </ul>

    );
}
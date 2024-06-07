
import React from "react";
import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Snippet } from "@nextui-org/react";
import { typeLink } from "@/types";
import SearchModal from "./modals/SearchModal";

import Image from "next/image";
import { SearchIcon } from "./Icons/SearchIcon";
import { MailIcon } from "./Icons/MailIcon";
import SwitchTheme from "./SwitchTheme";



const links = new Set<typeLink>([{ href: "/", label: "Accueil" }, { href: "/experts", label: "Nos experts", }, { href: "/reseau", label: "Notre reseau" }]);
export default function NavBar() {

    const curPath = usePathname()





    return (
        <Navbar isBordered >
            <NavbarContent justify="start">
                <NavbarBrand className="flex gap-2 mr-4">
                    <Image src={"/dark-logo.png"} alt="" width={0} height={0} unoptimized className="w-14 h-14" />

                </NavbarBrand>
                <NavbarContent className="sm:flex gap-3 hidden">
                    {Array.from(links).map((link, i) => (
                        <NavbarItem key={i}>
                            <Link href={link.href} className={(curPath === link.href ? "text-primary " : "text-inherit ") + " font-t  "}>

                                {link.label}</Link>
                        </NavbarItem>
                    ))}

                </NavbarContent>
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[10rem] h-10 min-w-52 ",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Trouvez votre expert..."
                    size="sm"
                    startContent={<SearchIcon size={18} />}
                    type="search"
                    variant="flat"
                />

            </NavbarContent>
            <NavbarContent className="!flex-grow-0 w-min" justify="end">
                <Button disableRipple className="p-1 border-none min-w-max" variant="ghost" color="primary"><MailIcon className="m-0 size-full" /></Button>
            </NavbarContent>
            <NavbarContent className="!flex-grow-0 w-min">
                <SwitchTheme />
            </NavbarContent>
        </Navbar >
    );
}



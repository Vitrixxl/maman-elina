import Image from "next/image";
import NavLinks from "./NavLinks";
import { typeLink } from "../../types";
import { Input, Button } from "@nextui-org/react";
import { SearchIcon } from "../Icons/SearchIcon";
import { MailIcon } from "../Icons/MailIcon";
import ThemeButton from "../SwitchTheme";
const links = new Set<typeLink>([{ href: "/", label: "Accueil" }, { href: "/experts", label: "Nos experts", subLinks: [{ href: "experts/it", label: "Informatique" }, { href: "experts/", label: "" }, { href: "experts/", label: "" }, { href: "experts/", label: "" }] }, { href: "/reseau", label: "Notre reseau" }]);

export default function NavBar() {
    return (
        <header className="top-0 sticky border-default bg-background border-b w-full">

            <ul className="flex items-center gap-4 m-auto px-4 lg:px-6 max-w-8xl h-20">
                <li className="mx-8">
                    <Image src={"/dark-logo.png"} alt="" width={0} height={0} unoptimized className="size-12" />
                </li>
                <li className="flex flex-grow justify-between h-full">

                    <NavLinks />

                    <div className="flex items-center gap-2 h-full">
                        <ThemeButton />
                        <Button
                            size="lg"
                            variant="ghost"
                            color="primary"

                            className="p-2 border-none min-w-0 text-foreground"
                        >

                            <MailIcon className="size-full" />
                        </Button>

                    </div>
                </li>

                <li className="">
                    <Input
                        type="Search"
                        placeholder="Rechercher..."
                        size="lg"
                        color="default"
                        className="min-w-64"
                        startContent={<SearchIcon size={18} />}

                        variant="bordered"


                    />
                </li>

            </ul>
        </header>

    );
}
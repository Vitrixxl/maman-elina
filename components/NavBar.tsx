"use client";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Snippet } from "@nextui-org/react";


export default function NavBar() {
    return (
        <Navbar isBordered>
            <NavbarBrand >

                <Link href="/" className="font-bold text-3xl text-inherit">VSX-Code</Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Welcome on my NEXT / PRISMA / NEXT-UI Template
                    </Link>
                </NavbarItem>

            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>

                    <Dropdown >
                        <DropdownTrigger>
                            <Button
                                variant="bordered"
                            >
                                Repository
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Example with disabled actions" closeOnSelect={false} disabledKeys={["edit", "delete"]}>
                            <DropdownItem key="new" variant="shadow">  <Snippet className="bg-transparent  px-0">npx npx-clone-next</Snippet></DropdownItem>
                            <DropdownItem key="copy" variant="shadow" >
                                <Link href="https://github.com/Vitrixxl/crud-nextjs" className=" h-10" target="_blank">
                                    Go to github
                                </Link>
                            </DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                    <Link href="https://github.com/Vitrixxl/crud-nextjs" target="_blank">
                        <Button variant="ghost" color="primary" size="md">
                            Repository
                        </Button>
                    </Link>

                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
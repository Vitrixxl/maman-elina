"use client";
import React from "react";

import { Button } from "@nextui-org/react";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";
import { useTheme } from "next-themes";

import { useEffect, useState } from "react";
export default function ThemeButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (



        <Button
            size="lg"
            variant="ghost"
            color="secondary"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 border-none min-w-0 text-foreground"
        >
            {theme === "light" ? <MoonIcon className="size-full" /> : <SunIcon className="size-full" />}
        </Button>




    );
}

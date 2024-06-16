"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import Link from "next/link";

import BurgerButton from "./BurgerButton";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Domain } from "@/types";
import { useTheme } from "next-themes";
import { MoonIcon } from "../Icons/MoonIcon";
import { SunIcon } from "../Icons/SunIcon";
export default function BurgerMenu({ domains }: { domains: Domain[] }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [clicked, setClicked] = useState<boolean>(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const Links = useMemo(() => {
    if (!domains) return;
    return (
      <ul className="flex flex-col gap-2">
        {domains.map((domain, i) => (
          <Link
            href={`/experts?domain=${domain.id}`}
            key={i}
            className="mx-2 border-t border-divider py-2 pt-4 text-sm"
            onClick={() => setIsOpen(false)}
          >
            {domain.name}
          </Link>
        ))}
      </ul>
    );
  }, [domains]);

  const themeRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = themeRef.current;
    if (!div) return;
    console.log("hey");
    const updateTheme = () => {
      const positions = div.getBoundingClientRect();
      console.log(window.innerWidth / 2);
      if (positions.x >= window.innerWidth / 2) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    const observer = new MutationObserver(updateTheme);

    observer.observe(div, { attributes: true, attributeFilter: ["style"] });

    // Initial position check
    updateTheme();

    // return () => {
    //   observer.disconnect();
    // };
  }, [clicked]);

  return (
    <>
      <BurgerButton opened={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, height: "0dvh" }}
            animate={{ opacity: 1, height: "100dvh" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute left-0 top-full z-0 h-screen w-screen bg-background bg-opacity-60 px-4 pt-2 backdrop-blur-lg backdrop-filter"
          >
            <div className="flex h-full flex-col">
              <Link
                href={"/"}
                className="mx-2 border-b border-divider py-4 text-lg"
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </Link>
              <Accordion>
                <AccordionItem key="2" aria-label="Experts" title="Experts">
                  {Links}
                </AccordionItem>
              </Accordion>
              <Link
                href={"/"}
                className="mx-2 border-t border-divider py-4 text-lg"
                onClick={() => setIsOpen(false)}
              >
                Notre reseau
              </Link>
              <button className="mx-2 border-t border-divider py-4 text-start text-lg">
                Contact
              </button>
            </div>
            <m.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="fixed bottom-20 left-0 h-12 w-full px-6"
            >
              <div className="h-full w-full rounded-full bg-foreground p-2 px-4">
                <div className="h-full w-full" ref={ref}>
                  <m.div
                    drag="x"
                    ref={themeRef}
                    whileDrag={{ scale: 1.3 }}
                    dragElastic={0}
                    dragConstraints={ref}
                    onClick={() => setClicked(true)}
                    className={
                      "flex aspect-square h-full rounded-full bg-background p-1 text-foreground" +
                      (theme == "light" && "flex-row-reverse")
                    }
                  >
                    {theme == "light" ? (
                      <MoonIcon className="size-full" />
                    ) : (
                      <SunIcon className="size-full" />
                    )}
                  </m.div>
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

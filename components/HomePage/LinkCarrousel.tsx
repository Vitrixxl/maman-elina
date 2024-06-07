"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion as m, AnimatePresence } from "framer-motion"
import { IoIosArrowRoundForward } from "react-icons/io";
export default function LinkCarrousel() {

    const [boolean, setBoolean] = useState<boolean>(false)
    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("hey")
            setBoolean(prevBoolean => !prevBoolean)
        }, 5000)

        // Cleanup function
        return () => clearInterval(intervalId)
    }, [])


    return (
        <AnimatePresence mode="wait">
            {
                boolean ? (
                    <m.div
                        key={1}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                    >
                        <Link href={"/"} className="flex items-end gap-4 font-light font-p text-4xl text-foreground">Trouvez un expert en un clique <IoIosArrowRoundForward /></Link>
                    </m.div>
                ) :
                    (
                        <m.div
                            key={2}
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                        >
                            <Link href={"/"} className="flex items-end gap-4 h-fit font-extralight font-p text-4xl text-foreground" >Je veux rentrer dans le reseau  <IoIosArrowRoundForward /></Link>
                        </m.div>)
            }
        </AnimatePresence>
    );
}
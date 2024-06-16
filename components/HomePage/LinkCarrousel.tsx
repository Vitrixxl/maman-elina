"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion as m, AnimatePresence } from "framer-motion";
import { IoIosArrowRoundForward } from "react-icons/io";
export default function LinkCarrousel() {
  const [boolean, setBoolean] = useState<boolean>(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBoolean((prevBoolean) => !prevBoolean);
    }, 5000);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {boolean ? (
        <m.div
          key={1}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.2, type: "just" }}
        >
          <Link
            href={"/experts"}
            className="font-p flex items-end gap-4 text-lg font-light text-foreground sm:text-2xl lg:text-4xl"
          >
            <h2>
              Trouvez un{" "}
              <span className="font-medium text-primary">expert</span> en un
              clique
            </h2>{" "}
            <IoIosArrowRoundForward className="text-secondary" />
          </Link>
        </m.div>
      ) : (
        <m.div
          key={2}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.2, type: "just" }}
        >
          <Link
            href={"/"}
            className="font-p flex h-fit items-center gap-4 text-lg font-extralight text-foreground sm:text-2xl lg:text-4xl"
          >
            <h2>
              Je veux rentrer dans le
              <span className="font-medium text-primary"> reseau</span>
            </h2>
            <IoIosArrowRoundForward className="text-secondary" />
          </Link>
        </m.div>
      )}
    </AnimatePresence>
  );
}

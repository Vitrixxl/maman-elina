"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import ExpertInfoModal from "./modals/ExpertInfoModal";
import { Expert } from "@/types";
export default function User({
  expert,
  info,
  size,
  disablePicture,
}: {
  expert: Expert;
  info: boolean;
  size?: string;
  disablePicture?: boolean;
}) {
  const test = false;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex items-center gap-2">
        {(!disablePicture || (disablePicture && isVisible)) && (
          <div className="border-background-500 flex h-[45px] w-[45px] flex-shrink-0 items-center justify-center rounded-full border-2 bg-background-300 text-foreground">
            {expert.lastName.substring(0, 2)}
          </div>
        )}
        <div className="flex flex-col justify-between text-foreground">
          <h1 className="text-medium md:text-lg">
            <span className="font-semibold text-primary">
              {expert.lastName}
            </span>{" "}
            {expert.firstName}
          </h1>
          <h2 className="text-sm italic text-foreground-300 sm:text-base">
            {expert.job}
          </h2>
        </div>
      </div>
    </>
  );
}

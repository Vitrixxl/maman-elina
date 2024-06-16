"use client";
import React, { useEffect, useState } from "react";

export default function SkeletonUser({
  disablePicture,
}: {
  disablePicture: boolean;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    const handleResize = () => {
      setIsVisible(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted]);
  return (
    <div className="flex items-center gap-2">
      {!disablePicture ||
        (disablePicture && isVisible && (
          <div className="border-background-500 bg-background-500 flex h-[45px] w-[45px] flex-shrink-0 items-center justify-center rounded-full border-2 text-foreground"></div>
        ))}
      <div className="flex flex-col justify-between gap-2">
        <div className="bg-background-500 h-fit w-fit rounded-xl text-base md:text-base">
          <span className="opacity-0">Cascales Vitrice</span>
        </div>
        <div className="bg-background-500 w-fit rounded-xl text-xs italic sm:text-sm">
          <span className="opacity-0">Developpeur web front-end</span>
        </div>
      </div>
    </div>
  );
}

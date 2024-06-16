import React, { useState, useEffect } from "react";
import SkeletonUser from "@/components/SkeletonUser";
import { Button } from "@nextui-org/react";
export default function SkeletonCard() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMini, setIsMini] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
      setIsMini(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted]);
  return (
    <>
      <div className="flex w-full animate-pulse gap-2 overflow-hidden rounded-xl bg-background-200 p-2 py-4 transition-all duration-100 before:bg-background-300 md:p-4">
        <div className="z-10 flex flex-grow flex-col gap-2">
          <div className="flex w-full flex-col justify-between sm:flex-row">
            <SkeletonUser disablePicture={true} />
            {!isVisible && isMounted && (
              <div className="my-1 mr-2 flex gap-2">
                <Button
                  className="aspect-square w-fit min-w-0 px-1"
                  size="sm"
                ></Button>
                <Button
                  size="sm"
                  className={
                    isMini
                      ? "aspect-square w-fit min-w-0 px-1"
                      : "font-semibold"
                  }
                >
                  <p className="opacity-0">{isMini ? "" : "Contacter"}</p>
                </Button>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <div className="w-fit rounded-xl bg-background-500 text-xs italic sm:text-xs">
              <span className="opacity-0">Francais</span>
            </div>
            <div className="w-fit rounded-xl bg-background-500 text-xs italic sm:text-xs">
              <span className="opacity-0">Anglais</span>
            </div>
            <div className="w-fit rounded-xl bg-background-500 text-xs italic sm:text-xs">
              <span className="opacity-0">Espagnole</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-3 w-12 rounded-xl bg-background-500"></div>
            <div className="h-3 w-24 rounded-xl bg-background-500"></div>

            <div className="h-3 w-16 rounded-xl bg-background-500"></div>
          </div>
          <div className="mt-2 w-full rounded-lg text-foreground-200">
            <div className="w-full rounded-xl bg-background-500">
              <span className="opacity-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                quis repellendus rerum cum ipsam, vel fugiat sunt suscipit
                soluta voluptatum veritatis deleniti dicta facilis itaque omnis.
                Quae magni ab obcaecati.
              </span>
            </div>
          </div>
        </div>
        <div className="gap z-10 hidden flex-col items-end justify-between gap-2 md:flex">
          <div>
            <div className="flex h-[70px] w-[70px] flex-shrink-0 items-center justify-center rounded-full bg-background-500 text-foreground">
              <span className="text-xl"></span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="pointer-events-none aspect-square min-w-0 bg-background-500 px-0">
              <p></p>
            </Button>
            <Button className="pointer-events-none bg-background-500">
              <p className="opacity-0">Contacter</p>
            </Button>
            {/* <TransferExpertModal expert={expert} />
            <ContactExpertModal expert={expert} /> */}
          </div>
        </div>
      </div>
    </>
  );
}

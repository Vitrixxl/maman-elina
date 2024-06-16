"use server";

import React from "react";
import LinkCarrousel from "@/components/HomePage/LinkCarrousel";
import BetterTable from "@/components/table/BetterTable";
import Image from "next/image";
import HomeCard from "@/components/Cards/HomeCard";

import HomeCarrousel from "@/components/CardCarrousel";
import { getExperts } from "./action/experts/function";
import exp from "constants";
export default async function UserListPage() {
  const experts = await getExperts();

  if (!experts) return;
  return (
    <div className="flex min-h-full w-full flex-col justify-between bg-background transition-all">
      <div className="mx-auto flex h-full w-full max-w-8xl flex-grow flex-col items-center justify-center gap-10 px-4 text-foreground lg:px-6">
        <div className="grid h-fit w-full grid-cols-2 gap-8 py-4">
          <div className="col-span-2 flex h-full flex-col items-center justify-between gap-4 lg:col-span-1">
            <div className="mt-2 flex w-full flex-grow flex-col gap-4 sm:justify-normal">
              <h2 className="font-p text-md font-semibold text-secondary xs:text-lg sm:text-xl lg:text-2xl">
                <span className="font-extralight text-foreground">
                  Professionel
                </span>{" "}
                ?{" "}
                <span className="font-extralight text-foreground">
                  Particulier
                </span>{" "}
                ?{" "}
                <span className="font-extralight text-foreground">
                  Entreprise
                </span>{" "}
                ?
              </h2>
              <h1 className="font-p line text-2xl font-semibold xs:text-3xl sm:text-[3rem] lg:text-[3.5rem] lg:leading-[3.7rem]">
                Mon Reseau d'Affaires
              </h1>
            </div>

            <div className="flex w-full flex-grow justify-center py-4 lg:hidden">
              <Image
                src={"/Online world-amico.svg"}
                alt=""
                width={0}
                height={0}
                unoptimized
                className="aspect-square w-full p-4 sm:h-[400px] sm:w-[400px] sm:p-0 md:w-full"
              />
            </div>
            <div className="w-full">
              <LinkCarrousel />
            </div>
          </div>

          <div className="hidden justify-center lg:flex">
            <Image
              src={"/Online world-amico.svg"}
              alt=""
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* <HomeCarrousel/> */}
      </div>
      <div className="carousel-container relative z-0 mx-auto mb-4 flex max-w-full flex-shrink-0 flex-nowrap justify-start gap-4 overflow-hidden md:mt-10">
        <div className="pointer-events-none absolute left-0 top-0 z-50 h-full w-10 bg-gradient-to-r from-background to-transparent sm:w-32"></div>
        <HomeCarrousel experts={experts} />
        <HomeCarrousel experts={experts} />
        <div className="pointer-events-none absolute right-0 top-0 z-50 h-full w-10 bg-gradient-to-r from-transparent to-background sm:w-32"></div>
      </div>
    </div>
  );
}

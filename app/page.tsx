import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import React from "react";
import LinkCarrousel from "@/components/HomePage/LinkCarrousel";
import BetterTable from "@/components/table/BetterTable";
import Image from "next/image";
export default async function UserListPage() {
    // const users = await prisma?.user.findMany()
    // if (!users) return null;
    // console.log(users)
    return (
        <div className="bg-background w-full h-full">

            <div className="flex items-center mx-auto px-4 lg:px-6 max-w-8xl h-full">
                <div className="place-content-center gap-8 grid grid-cols-2 w-full h-fit">
                    <div className="flex flex-col justify-between items-center gap-4">
                        <div className="w-full">

                            <h2 className="font-p font-thin text-2xl">Professionel ? Particulier ? Entreprise ?</h2>
                            <h1 className="font-p font-semibold text-[4rem]">Mon reseau d'Affaires</h1>
                        </div>
                        <div className="w-full" >
                            <LinkCarrousel />
                        </div>
                    </div>
                    <div className="flex justify-center">

                        <Image src={"/Online world-amico.svg"} alt="" width={500} height={500} />
                    </div>
                </div>
            </div>


        </div>
    );
}
"use server";
import React from "react";
import HomeCard from "./Cards/HomeCard";
import { Expert } from "@/types";
export default async function HomeCarrousel({
  experts,
}: {
  experts: Expert[];
}) {
  return (
    <ul className="carousel-list grid w-fit grid-flow-col gap-4 whitespace-nowrap">
      {experts.slice(0, 10).map((expert, i) => (
        <HomeCard expert={expert} key={i} />
      ))}
    </ul>
  );
}

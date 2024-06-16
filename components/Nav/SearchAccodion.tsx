"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
const title = () => {
  return (
    <div className="flex justify-between">
      <h1>Domaines</h1>
      <h2>0</h2>
    </div>
  );
};
import { useMemo } from "react";
import User from "../User";
import exp from "constants";
import { Expert, Domain } from "@/types";
import Link from "next/link";
export default function SearchAccordion({
  experts,
  domains,
}: {
  experts: Expert[];
  domains: Domain[];
}) {
  const itemClasses = {
    base: "py-0 w-full h-fit py-1",
    title: "font-normal text-medium",

    trigger:
      "px-2 py-2  my-2 data-[hover=true]:bg-background-300 rounded-lg  flex items-center",
    indicator: "text-medium",
    content:
      "text-sm   relative after:absolute after:top-0 after:transform after:translate-x-1/2 after:w-1/2 after:h-[1px] after:bg-default   after:transition-all after:duration-300 ",
  };
  const expertsTitle = useMemo(() => {
    return (
      <div className="flex items-center justify-between">
        <h1>Experts</h1>
        <h2 className="text-base text-commentary">
          {experts[0] ? (experts.length > 9 ? "9+" : experts.length) : 0}
        </h2>
      </div>
    );
  }, [experts]);

  const expertsList = useMemo(() => {
    if (!experts[0])
      return (
        <>
          <p className="italic text-commentary">Aucun expert trouvé</p>
        </>
      );

    return (
      <ul className="flex flex-col gap-2">
        {experts.slice(0, 9).map((expert: Expert, i: number) => (
          <Link
            key={i}
            href={`/experts?refId=${expert.id}`}
            className="rounded-xl px-1 duration-100 transition-background hover:bg-background-300"
          >
            <User expert={expert} info={false} />
          </Link>
        ))}
        {experts.length > 9 && (
          <Link
            href={"/"}
            className="w-full text-center font-medium text-primary"
          >
            Voir plus
          </Link>
        )}
      </ul>
    );
  }, [experts]);

  const domainList = useMemo(() => {
    if (!domains[0])
      return (
        <>
          <p className="italic text-commentary">Aucun domaine trouvé</p>
        </>
      );
    return (
      <ul className="flex flex-col gap-2">
        {domains.map((domain: any, i: number) => (
          <Link
            key={i}
            href={"/experts?domain=" + domain.name}
            className="rounded-md px-2 py-2 text-sm text-foreground-300 hover:bg-background-200 hover:text-foreground"
          >
            {domain.name}
          </Link>
        ))}
      </ul>
    );
  }, [domains]);

  const domainTitle = useMemo(() => {
    return (
      <div className="flex justify-between">
        <h1>Domaines</h1>
        <h2 className="text-base text-commentary">
          {domains[0] ? domains.length : 0}
        </h2>
      </div>
    );
  }, [domains]);

  return (
    <Accordion variant="shadow" itemClasses={itemClasses}>
      <AccordionItem
        key="1"
        aria-label="Domaines"
        aria-expanded
        title={domainTitle}
        className=""
      >
        {domainList}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Experts"
        aria-expanded
        title={expertsTitle}
        className="z-50"
      >
        {expertsList}
      </AccordionItem>
    </Accordion>
  );
}

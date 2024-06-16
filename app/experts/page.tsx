"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import FilterAccordion from "@/components/ExpertPage/FilterAccordion";
import ExpertCard from "@/components/ExpertPage/ExpertCard";

import { getDomains } from "../action/domains/function";
import { motion as m, AnimatePresence } from "framer-motion";
import ExpertList from "@/components/ExpertPage/ExpertList";
import { getExperts } from "../action/experts/function";
import ExpertSearchBar from "@/components/ExpertPage/SearchBar";
import { Expert, Domain } from "@/types";

export default function ExpertPage() {
  const [experts, setExperts] = useState<Expert[]>();
  const [domains, setDomains] = useState<Domain[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  // const domains = await getDomains();
  // const experts = await getExperts();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedDomains = await getDomains();
      const fetchedExperts = await getExperts();
      setDomains(fetchedDomains);
      setExperts(fetchedExperts);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="h-full w-full bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-8">
        <div className="px-4 pt-4 sm:pt-10 lg:px-6">
          <div className="xs:text-xl flex flex-col gap-2 text-lg font-semibold text-foreground sm:flex-row md:text-3xl">
            <h1>
              Nos meilleurs <span className="text-primary"> experts</span>
            </h1>
            <h1>
              a votre
              <span className="text-secondary"> service </span>
            </h1>
          </div>
        </div>

        <div className="flex w-full grid-cols-auto-1fr-auto flex-col gap-3 px-4 lg:grid lg:px-6">
          <div className="z-10 col-span-1 w-fit md:w-72">
            <div className="sticky top-24 flex h-fit w-full flex-col rounded-xl">
              <FilterAccordion domains={domains} />
            </div>
          </div>
          <div className="z-0 mb-4 flex flex-col gap-2">
            <ExpertList dbExperts={experts} />
          </div>
        </div>
      </div>
    </div>
  );
}

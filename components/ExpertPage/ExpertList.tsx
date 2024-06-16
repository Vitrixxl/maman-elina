"use client";
import React, { useState, useEffect, use } from "react";

import ExpertCard from "./ExpertCard";
import SkeletonCard from "./SkeletonCard";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion as m } from "framer-motion";
import { Expert } from "@/types";
export default function ExpertList({
  dbExperts,
}: {
  dbExperts: Expert[] | undefined;
}) {
  const params = useSearchParams();

  useEffect(() => {}, []);

  const [experts, setExperts] = useState([] as Expert[] | []);

  const [domainQuery, setDomainQuery] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [exp, setExp] = useState<number>(0);
  useEffect(() => {
    if (!dbExperts) return;
    setExperts(dbExperts);
  }, [dbExperts]);
  useEffect(() => {
    setDomainQuery(params.get("domain")?.split("+") || [""]);
    setSearch(params.get("search") || "");
    setExp(Number(params.get("exp")) || 0);
  }, [params]);

  useEffect(() => {
    if (!dbExperts) return;
    setExperts(dbExperts.filter(sortingExpert));
  }, [domainQuery, search, exp]);

  const checkSearch = (expert: Expert) => {
    if (
      expert.lastName.toLowerCase().includes(search.toLowerCase()) ||
      expert.firstName.toLowerCase().includes(search.toLowerCase()) ||
      expert.domain.name.toLowerCase().includes(search.toLowerCase()) ||
      expert.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase()),
      ) ||
      expert.caption?.toLowerCase().includes(search.toLowerCase())
    ) {
      return true;
    }
  };
  const checkExp = (expert: Expert) => {
    if (exp === 0) return true;
    return expert.experience >= exp;
  };
  const checkDomain = (expert: Expert) => {
    if (domainQuery[0] === "") return true;
    return domainQuery.some((domain) =>
      expert.domain.name.toLowerCase().includes(domain.toLowerCase()),
    );
  };

  const sortingExpert = (expert: Expert) => {
    return checkSearch(expert) && checkDomain(expert) && checkExp(expert);
  };

  return (
    <>
      {dbExperts ? (
        dbExperts.map((expert, i) => {
          if (!sortingExpert(expert)) return;
          return (
            <div>
              <ExpertCard expert={expert} />
            </div>
          );
        })
      ) : (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
    </>
  );
}

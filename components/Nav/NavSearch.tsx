"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { motion as m, AnimatePresence } from "framer-motion";
import { SearchIcon } from "../Icons/SearchIcon";

import { typeExpert } from "@/types";
import HomeCard from "./SerchCard";
import SearchAccordion from "./SearchAccodion";
import { Expert, Domain } from "@/types";
export default function NavSearch({
  DBexperts,
  DBdomains,
}: {
  DBexperts: Expert[];
  DBdomains: Domain[];
}) {
  const [search, setSearch] = useState<string>("");
  const [domains, setDomains] = useState<Domain[]>(DBdomains);
  const [experts, setExperts] = useState<Expert[]>(DBexperts);
  useEffect(() => {
    if (search === "") return;
    setExperts(
      DBexperts.filter(
        (expert) =>
          expert.lastName.toLowerCase().includes(search.toLowerCase()) ||
          expert.firstName.toLowerCase().includes(search.toLowerCase()),
      ),
    );
    setDomains(
      DBdomains.filter((domain) =>
        domain.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search]);
  const resetSearch = () => {
    setSearch("");
  };
  useEffect(() => {
    document.addEventListener("click", (e) => {
      const elementClicked = e.target as HTMLElement;
      const searchbar = document.querySelector(".searchbar");
      console.log(searchbar, elementClicked);
      if (!searchbar?.contains(elementClicked)) {
        resetSearch();
      }
    });
  }, []);
  return (
    <div className="searchbar">
      <Input
        type="Search"
        placeholder="Rechercher un expert..."
        size="lg"
        color="default"
        className="input min-w-64 text-foreground"
        startContent={<SearchIcon size={18} className="text-foreground" />}
        variant="bordered"
        value={search}
        onClear={resetSearch}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      {search != "" && (
        <div className="searchList absolute top-full mt-2 min-w-full py-2">
          <SearchAccordion experts={experts} domains={domains} />
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Slider,
} from "@nextui-org/react";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchIcon } from "../Icons/SearchIcon";
import { Domain } from "@/types";
import { FaCaretDown } from "react-icons/fa";
export default function FilterAccordion({
  domains,
}: {
  domains: Domain[] | undefined;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const keywords = ["Dentist", "Orthodontist", "New York", "test", "test2"];
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [domainQuery, setDomainQuery] = useState<string[]>([]);
  const [expQuery, setExpQuery] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const itemClasses = {
    base: "py-0 w-full h-fit",
    title: "font-normal text-medium",

    trigger:
      "px-2 py-2 !h-fit my-2 data-[hover=true]:bg-background-200 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content:
      "text-sm px-2   relative after:absolute after:top-0 after:transform after:translate-x-1/2 after:w-1/2 after:h-[1px] after:bg-default   after:transition-all after:duration-300 ",
  };
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!document.querySelector(".miniSearch")?.contains(e.target as Node)) {
        setIsOpened(false);
        document.removeEventListener("click", handleClick);
      }
    };
    if (isOpened) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }
  }, [isOpened]);

  useEffect(() => {
    const domain = params.get("domain");
    if (domain) {
      setIsExpanded(true);
      setDomainQuery(domain.split("+"));
    }
    const exp = params.get("exp");
    if (exp) {
      setExpQuery(parseInt(exp));
    }
    const search = params.get("search");
    if (search) {
      setSearch(search);
    }
  }, []);
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }
    const newPath =
      "?domain=" +
      encodeURIComponent(domainQuery.join("+")) +
      "&search=" +
      encodeURIComponent(search) +
      "&exp=" +
      encodeURIComponent(expQuery.toString());
    router.push(newPath);
    const handleResize = () => {
      setIsVisible(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [domainQuery, expQuery, search]);

  const setQueryDomain = (domain: string) => {
    if (domainQuery.includes(domain)) {
      setDomainQuery(domainQuery.filter((d) => d !== domain));
    } else {
      setDomainQuery([...domainQuery, domain]);
    }
  };

  const CheckList = useMemo(() => {
    return (
      <ul className="flex flex-col gap-2">
        {domains &&
          domains.map((domain, i) => (
            <li key={i}>
              <button
                className={
                  (domainQuery.includes(domain.name)
                    ? "t border-l-4 border-primary pl-4 text-foreground"
                    : "text-commentary") +
                  " w-full px-2 text-start transition-all duration-100 hover:text-foreground"
                }
                onClick={() => setQueryDomain(domain.name)}
              >
                {domain.name}
              </button>
            </li>
          ))}
      </ul>
    );
  }, [domainQuery, domains]);
  const ExpBar = (
    <Slider
      size="sm"
      step={1}
      color="secondary"
      label="Années d'expérience"
      classNames={{
        label: "text-commentary",
        thumb: "bg-primary",
        value: "text-commentary",
      }}
      showSteps={true}
      maxValue={10}
      minValue={0}
      defaultValue={0}
      onChange={(value) => typeof value === "number" && setExpQuery(value)}
      className="max-w-full"
    />
  );

  return (
    <>
      {isVisible ? (
        <div className="rounded-xl border border-default">
          <Input
            size="lg"
            type="Search"
            placeholder="Rechercher un expert..."
            radius="none"
            classNames={{
              input: "bg-transparent",
              innerWrapper: "bg-transparent ",
              inputWrapper: "bg-transparent border-b border-default",
            }}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            value={search}
            startContent={<SearchIcon size={18} className="text-foreground" />}
          />
          <Accordion
            itemClasses={itemClasses}
            selectionMode="multiple"
            selectedKeys={isExpanded ? "1" : ""}
          >
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="Domaines"
              onClick={() => {
                if (isExpanded) setIsExpanded(!isExpanded);
              }}
            >
              {CheckList}
            </AccordionItem>

            <AccordionItem key="3" aria-label="Accordion 2" title="Experience">
              <div className="w-full px-1">{ExpBar}</div>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <div className="relative flex max-w-full gap-4 rounded-xl border border-default">
          <Input
            size="md"
            variant="flat"
            placeholder="Rechercher un expert..."
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            value={search}
            startContent={
              <SearchIcon
                size={18}
                className="min-w-0 max-w-full rounded-full text-foreground"
              />
            }
          />
          <Button
            onClick={() => setIsOpened(!isOpened)}
            className="min-w-0 border-none bg-transparent px-6 text-foreground hover:bg-default hover:bg-opacity-30"
          >
            <FaCaretDown />
          </Button>
          {isOpened && (
            <>
              <div className="miniSearch absolute left-0 top-full z-50 mt-2 h-fit w-fit rounded-xl border border-default bg-background transition-all">
                <Accordion
                  itemClasses={itemClasses}
                  selectionMode="multiple"
                  selectedKeys={isExpanded ? "1" : ""}
                  className="transition-all"
                >
                  <AccordionItem
                    key="1"
                    aria-label="Accordion 1"
                    title="Domaines"
                    onClick={() => {
                      if (isExpanded) setIsExpanded(!isExpanded);
                    }}
                  >
                    {CheckList}
                  </AccordionItem>

                  <AccordionItem
                    key="3"
                    aria-label="Accordion 2"
                    title="Experience"
                  >
                    <div className="w-full px-1">{ExpBar}</div>
                  </AccordionItem>
                </Accordion>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

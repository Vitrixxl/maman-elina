"use client";
import { typeExpert } from "@/types";
import React, { useRef, useEffect, useState } from "react";
import User from "../User";
import ContactExpertModal from "./ContactExpertModal";
import TransferExpertModal from "./TransfertExpretModal";
import { Expert } from "@/types";
import { useSearchParams } from "next/navigation";

export default function ExpertCard({ expert }: { expert: Expert }) {
  if (!expert) return;
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const params = useSearchParams();
  const refId = params.get("refId");
  const cardRef = useRef<HTMLDivElement>(null);
  if (refId === expert.id) {
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    cardRef.current?.classList.add("animate-expert");
  }
  const [isVisible, setIsVisible] = useState<boolean>(window.innerWidth > 768);
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={cardRef}
      className="z-0 my-2 flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-background-200 p-2 transition-all duration-100 before:bg-background-300 hover:bg-background-300 md:my-0 md:flex-row md:p-4"
    >
      <div className="z-10 flex flex-grow flex-col">
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
          <User expert={expert} info={false} disablePicture={true} />
          {!isVisible && (
            <div className="my-1 mr-2 flex gap-2 sm:my-0">
              <TransferExpertModal expert={expert} />
              <ContactExpertModal expert={expert} />
            </div>
          )}
        </div>
        <div className="flex gap-2 text-base font-semibold">
          {expert.languages.map((lang, i) => (
            <span key={i} className="z-0 text-secondary">
              {lang.name}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {expert.tags.map((tag, i) => (
            <li
              key={i}
              className="flex h-fit items-center justify-center gap-0.5 text-sm font-semibold text-commentary"
            >
              <span className="text-medium text-secondary">#</span>
              {tag}
            </li>
          ))}
        </div>
        <div className="mt-2 w-full rounded-lg text-foreground-200">
          <p className="text-wrap break-words">{expert.caption}</p>
        </div>
      </div>
      <div className="gap z-10 flex flex-col items-end justify-between gap-2">
        {isVisible && (
          <>
            <div className="flex h-[70px] w-[70px] flex-shrink-0 items-center justify-center rounded-full border-2 border-background-500 bg-background-300 text-foreground">
              <span className="text-xl">
                {expert.firstName.substring(0, 2)}
              </span>
            </div>
            <div className="flex gap-2">
              <TransferExpertModal expert={expert} />
              <ContactExpertModal expert={expert} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

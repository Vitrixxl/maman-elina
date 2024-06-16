"use client";

import React from "react";
import { Expert } from "@/types";
import Link from "next/link";
import User from "../User";

export default function HomeCard({ expert }: { expert: Expert }) {
  return (
    <Link
      href={`/experts?refId=${expert.id}`}
      className="row-span-3 grid w-64 grid-rows-subgrid gap-1 rounded-xl bg-background-200 p-2 transition-all duration-100 hover:bg-background-300 light:border light:border-default md:w-96"
    >
      <div className="flex w-full max-w-full items-center justify-between rounded-xl px-2 py-1 transition-background hover:bg-background-300">
        <User expert={expert} info={true} />
      </div>
      <div className="flex flex-col px-2">
        <ul className="flex gap-1">
          {expert.languages.map((lang, i) => (
            <li
              key={i}
              className="md:text-basetext-foreground-200 text-sm font-semibold first-letter:text-secondary"
            >
              {lang.name}
            </li>
          ))}
        </ul>
        <ul className="flex h-full flex-wrap items-center gap-2">
          {expert.tags.map((tag, i) => (
            <li
              key={i}
              className="flex h-fit items-center justify-center gap-0.5 text-sm text-commentary md:font-semibold"
            >
              <span className="text-medium text-secondary">#</span>
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden max-w-full rounded-lg px-2 py-1 transition-background md:block">
        <p className="line-clamp-2 text-ellipsis text-wrap break-words text-foreground-200">
          {expert.caption}
        </p>
      </div>
    </Link>
  );
}

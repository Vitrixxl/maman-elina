"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../Icons/SearchIcon";
export default function ExpertSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);
  useEffect(() => {
    const key = searchParams.get("key") || "";
    const domain = searchParams.get("domain") || "";
    console.log("this is it ", domain, key);
    const newPath =
      "?key=" +
      encodeURIComponent(key) +
      "&domain" +
      encodeURIComponent(domain) +
      "&search=" +
      search;
    router.push(newPath);
  }, [search]);

  return (
   
  );
}

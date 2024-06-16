"use client";
import { Expert } from "@/types";
import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import BetterTable from "../../components/table/BetterTable";

export default function AdminTabs({ experts }: { experts: Expert[] }) {
  let tabs = [
    {
      id: "experts",
      label: "Experts",
      content: <BetterTable users={experts} />,
    },
    {
      id: "photos",
      label: "Photos",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: "domains",
      label: "Domains",
      content: "",
    },
  ];

  return (
    <div className="flex w-fit flex-col">
      <Tabs aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <Card>
              <CardBody>{item.content}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

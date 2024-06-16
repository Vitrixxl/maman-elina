"use server";
import React from "react";
import BetterTable from "../../components/table/BetterTable";
import { insertTest, getExperts } from "../action/experts/function";
import { Button } from "@nextui-org/react";
import AdminTabs from "@/components/Admin/Tabs";
import ProtectedRoute from "../../components/Admin/ProtectedRoute";
export default async function ComponentName() {
  // const test = await insertTest();
  // await insertTest();
  const experts = await getExperts();
  if (!experts) return;
  return (
    <ProtectedRoute>
      <div className="flex h-full w-full items-center justify-center bg-background">
        <AdminTabs experts={experts} />
        {/* <div className="flex h-full w-fit flex-col items-center justify-center bg-background">
        <BetterTable users={experts} />
        <div className="flex w-full justify-between">
        <h2 className="text-3xl text-foreground">Autres</h2>
        </div>
        </div> */}
      </div>
    </ProtectedRoute>
  );
}

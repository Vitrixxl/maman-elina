"use client";

import React, { useState, useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}
import { useRouter } from "next/navigation";
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("api/auth/middleware", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setIsLoading(false);
      } else {
        router.push("/admin/login");
      }
    });
  }, []);
  return <>{isLoading ? <div>Loading...</div> : children}</>;
}

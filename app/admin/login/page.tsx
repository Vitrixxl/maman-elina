"use client";
import React, { useState, useEffect } from "react";
import prisma from "@/lib/prisma";

import { Input, Button } from "@nextui-org/react";
import { MailIcon } from "@/components/Icons/MailIcon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LockIcon } from "@/components/Icons/LockIcon";
import { useRouter } from "next/navigation";
export default function ComponentName() {
  const router = useRouter();
  const handleSubmit = async (e: React.MouseEvent) => {
    console.log("hey");
    e.preventDefault();
    if (emailError != "" || passwordError != "") return;

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        router.push("/admin");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  useEffect(() => {
    if (email === "") {
      setEmailError("Vous devez rentrer une adresse mail");
    } else if (!email?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setEmailError("Adresse mail invalide");
    } else {
      setEmailError("");
    }
  }, [email]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex flex-col gap-4 rounded-xl bg-background-200 p-4">
        <h1 className="w-full text-start text-xl font-semibold text-secondary md:text-2xl">
          Login
        </h1>

        <form className="flex flex-col items-end gap-2">
          <Input
            type="Email"
            value={email || ""}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            color="primary"
            variant="bordered"
            label="Email"
            isRequired
            isClearable
            errorMessage={emailError != "" ? emailError : undefined}
            isInvalid={emailError != ""}
            // endContent={
            //   <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            // }
            onClear={() => setEmail("")}
          />
          <Input
            isRequired
            size="md"
            className="min-w-72"
            type="password"
            value={password}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            color="primary"
            // endContent={
            //   <LockIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
            // }
            variant="bordered"
            label="Mot de passe"
            onClear={() => setPassword("")}
          />
          <div className="flex w-fit gap-2">
            <Button color="secondary" className="font-semibold" variant="flat">
              Retour
            </Button>
            <Button
              color="primary"
              className="font-semibold"
              onClick={(e: React.MouseEvent) => handleSubmit(e)}
              isLoading={isLoading}
            >
              Connexion
            </Button>
          </div>

          {/* <input
            type="email"
            name="username"
            id="username"
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button type="submit">Login</button> */}
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

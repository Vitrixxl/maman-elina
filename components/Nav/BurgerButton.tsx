"use client";
import React, { useState } from "react";

export default function BurgerButton({
  onClick,
  opened,
}: {
  onClick: () => void;
  opened: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex h-8 w-8 items-center justify-center"
    >
      <div
        className={`burger-line transition-all duration-300 ease-in-out before:absolute before:block before:h-1 before:w-8 before:rounded-full before:bg-foreground after:absolute after:block after:h-1 after:w-8 after:rounded-full after:bg-foreground ${
          opened
            ? "before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:transform after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45 after:transform"
            : "before:bottom-2 before:left-1/2 before:-translate-x-1/2 after:left-1/2 after:top-2 after:-translate-x-1/2"
        }`}
      ></div>
    </button>
  );
}

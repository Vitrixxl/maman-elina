"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Textarea,
} from "@nextui-org/react";
import { MailIcon } from "../Icons/MailIcon";

import { Expert } from "@/types";
import { RiShare2Line } from "react-icons/ri";
export default function TransferExpertModal({ expert }: { expert: Expert }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = useState<boolean>(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Button
        onPress={onOpen}
        color="secondary"
        variant="ghost"
        size={isVisible ? "md" : "sm"}
        className="aspect-square w-fit min-w-0 px-1"
      >
        <RiShare2Line className="size-full" />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="bg-background"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-foreground">
                <p>
                  Transferez le profil de{" "}
                  <span className="text-secondary">
                    {" "}
                    {expert.lastName} {expert.firstName}
                  </span>
                </p>
              </ModalHeader>
              <ModalBody className="grid-col-2 grid text-foreground">
                <Input
                  autoFocus
                  type="Email"
                  className="col-span-1"
                  placeholder=""
                  color="primary"
                  endContent={
                    <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                  }
                  variant="bordered"
                  label={"Email de transfert"}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  className="font-semibold"
                >
                  Fermer
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  className="font-semibold"
                >
                  Envoyer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

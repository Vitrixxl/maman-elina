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
export default function ContactExpertModal({ expert }: { expert: Expert }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMini, setIsMini] = useState<boolean>(window.innerWidth < 640);
  const [isVisible, setIsVisible] = useState<boolean>(window.innerWidth > 768);
  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768);
      setIsMini(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        size={isVisible ? "md" : "sm"}
        className={
          isMini ? "aspect-square w-fit min-w-0 px-1" : "font-semibold"
        }
      >
        {isMini ? <MailIcon className="size-full" /> : "Contacter"}
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
              <ModalHeader className="text-foreground">
                <p>
                  Envoyer un message a
                  <span className="text-secondary">
                    {" "}
                    {expert.lastName + " " + expert.firstName}{" "}
                  </span>
                </p>
              </ModalHeader>
              <ModalBody className="grid-col-2 grid text-foreground">
                <Input
                  type="text"
                  className="col-span-1"
                  variant="bordered"
                  color="primary"
                  placeholder=""
                  isRequired
                  label={"Nom"}
                  autoFocus
                />
                <Input
                  type="text"
                  className="col-span-1"
                  placeholder=""
                  color="primary"
                  variant="bordered"
                  label={"Prenom"}
                  isRequired
                />
                <Input
                  type="Email"
                  placeholder=""
                  color="primary"
                  variant="bordered"
                  label={"Email"}
                  isRequired
                />
                <Input
                  type="tel"
                  className="col-span-1"
                  placeholder=""
                  color="primary"
                  variant="bordered"
                  label={"Telephone"}
                  isRequired
                />
                <Textarea
                  label="Votre message"
                  className="col-span-2"
                  color="primary"
                  disableAutosize
                  variant="bordered"
                  isRequired
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  className="font-semibold"
                  onPress={onClose}
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

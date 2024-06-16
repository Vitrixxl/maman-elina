"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { MailIcon } from "@/components/Icons/MailIcon";

export default function MailModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size="lg"
        variant="ghost"
        color="secondary"
        className="min-w-0 border-none p-2 text-foreground"
        onPress={onOpen}
      >
        <MailIcon className="size-full" />
      </Button>
      <Modal
        isOpen={isOpen}
        classNames={{ base: "bg-background" }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-p flex flex-col gap-1 text-xl text-secondary">
                <span className="text-medium font-light text-foreground">
                  Une idée, un projet ou une question ?
                </span>
                Contactez nous !
              </ModalHeader>
              <ModalBody className="grid grid-cols-2">
                <Input
                  variant="bordered"
                  type="text"
                  placeholder=""
                  aria-placeholder="Nom"
                  label="Nom"
                  className="col-span-1"
                  color="primary"
                  isRequired
                />
                <Input
                  variant="bordered"
                  placeholder=""
                  aria-placeholder="Prénom"
                  color="primary"
                  label="Prénom"
                  isRequired
                  className="col-span-1"
                />
                <Input
                  variant="bordered"
                  className="col-span-2"
                  color="primary"
                  placeholder=""
                  label="Email"
                  type="Email"
                  aria-placeholder="Email"
                  isRequired
                />
                <Input
                  variant="bordered"
                  placeholder=""
                  aria-placeholder="Sujet"
                  color="primary"
                  label="Sujet"
                  isRequired
                  className="col-span-2"
                />
                <Textarea
                  disableAutosize
                  classNames={{
                    input: "resize-y min-h-24",
                  }}
                  variant="bordered"
                  className="col-span-2"
                  placeholder=""
                  label="Votre message"
                  aria-placeholder="Votre message"
                  color="primary"
                  isRequired
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  variant="light"
                  className="font-semibold"
                  onPress={onClose}
                >
                  Fermer
                </Button>
                <Button
                  color="primary"
                  className={"font-semibold"}
                  onPress={onClose}
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

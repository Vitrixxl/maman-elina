import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { deleteUser } from "@/app/action/user";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { deleteExpert } from "@/app/action/experts/function";
export default function DeleteModal({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="m-0 min-w-0 border-none bg-transparent p-0"
      >
        <span className="cursor-pointer text-lg text-danger active:opacity-50">
          <DeleteIcon />
        </span>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete user
              </ModalHeader>
              <ModalBody>Are you sure to delete {name}'s account ?</ModalBody>
              <ModalFooter>
                <Button color="secondary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  variant="ghost"
                  onPress={() => {
                    deleteExpert(id);
                    onClose();
                  }}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

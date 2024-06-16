import React, { useEffect, useMemo, useState } from "react";
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
  button,
  Textarea,
} from "@nextui-org/react";
import { MailIcon } from "../Icons/MailIcon";
import {
  getLocations,
  getDomains,
  getLanguages,
} from "@/app/action/experts/function";
import { Location, Domain, Language, Expert } from "@/types";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";

import { insertExpert } from "@/app/action/experts/function";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
// import { LockIcon } from './LockIcon.jsx';
// import { addExpert } from "@/app/action/experts/function";
type InvalidTag = {
  invalid: boolean;
  message: string;
};
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Exp = [
  { id: "1k", name: "1" },
  { id: "2k", name: "2" },
  { id: "3k", name: "3" },
  { id: "4k", name: "4" },
  { id: "5k", name: "5" },
  { id: "6k", name: "6" },
  { id: "7k", name: "7" },
  { id: "8k", name: "8" },
  { id: "9k", name: "9" },
  { id: "10+k", name: "10+" },
];
type RequiredExpert = {
  firstName: string;
  lastName: string;
  email: string;
  domainId: string;
  locationId: string;
  experience: number;
  tags: string[];
  languages: string[];
  caption: string | null;
};
export default function FormModal({ expert }: { expert?: Expert }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [curExpert, setCurExpert] = useState<RequiredExpert>({
    firstName: "",
    lastName: "",
    email: "",
    domainId: "",
    locationId: "",
    experience: 0,
    tags: [],
    languages: [],
    caption: null,
  });
  useEffect(() => {
    if (curExpert.caption == "") setCurExpert({ ...curExpert, caption: null });
  }, [curExpert.caption]);
  const [locations, setLocations] = useState<Location[]>(
    expert ? expert.location : {},
  );
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [invalidTag, setInvalidTag] = useState<InvalidTag>({
    invalid: false,
    message: "",
  });

  const [invalidLang, setInvalidLang] = useState<InvalidTag>({
    invalid: false,
    message: "",
  });
  const getL = async () => {
    const loc = await getLocations();
    if (!loc) return;
    setLocations(loc);
  };
  const getD = async () => {
    const dom = await getDomains();

    if (!dom) return;
    setDomains(dom);
  };
  const getLang = async () => {
    const lang = await getLanguages();
    if (!lang) return;
    setLanguages(lang);
  };

  const handleOpening = () => {
    getL();
    getD();
    getLang();
  };
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [selectedLangs, setSelectedLangs] = useState<Language[]>([]);
  const [currentLang, setCurrentLang] = useState<Language>({
    id: "",
    name: "",
  });

  const removeLang = (id: string) => {
    setSelectedLangs(selectedLangs.filter((lang) => lang.id != id));
  };
  const Lang = ({ lang }: { lang: Language }) => (
    <div className="flex gap-0.5">
      <p className="text-sm italic text-commentary">
        <span>{lang.name}</span>
      </p>
      <button
        className="text-secondary"
        onClick={() =>
          setSelectedLangs(selectedLangs.filter((l) => l.id != lang.id))
        }
      >
        <IoClose />
      </button>
    </div>
  );
  const Langs = useMemo(() => {
    return selectedLangs.map((lang) => <Lang key={lang.id} lang={lang} />);
  }, [selectedLangs]);
  useEffect(() => {
    console.log(currentLang, "currentLang");
  }, [currentLang]);
  const addLang = () => {
    if (currentLang.id === "")
      return setInvalidLang({
        invalid: true,
        message: "Veuillez choisir une langue ",
      });

    if (selectedLangs.find((l) => l.id == currentLang.id))
      return setInvalidLang({
        invalid: true,
        message: "Vous avez déjà choisis cette langue",
      });
    if (selectedLangs.length >= 5)
      return setInvalidLang({
        invalid: true,
        message: "Vous ne pouvez inclure que 5 langues",
      });
    setSelectedLangs([...selectedLangs, currentLang]);
    setCurrentLang({ id: "", name: "" });
  };
  const addTag = () => {
    if (currentTag === "")
      return setInvalidTag({
        invalid: true,
        message: "Veuillez saisir un tag",
      });
    if (tags.includes(currentTag))
      return setInvalidTag({
        invalid: true,
        message: "Vous avez déjà choisis se tag",
      });
    if (tags.length >= 5)
      return setInvalidTag({
        invalid: true,
        message: "Vous ne pouvez inclure que 5 tag",
      });
    setInvalidTag({ invalid: false, message: "" });
    setTags([...tags, currentTag]);
    setCurrentTag("");
  };

  const Tag = ({ name }: { name: string }) => (
    <div className="flex gap-0.5">
      <p className="text-sm italic text-commentary">
        #<span>{name}</span>
      </p>
      <button
        className="text-secondary"
        onClick={() => setTags(tags.filter((t) => t != name))}
      >
        <IoClose />
      </button>
    </div>
  );
  const Tags = useMemo(() => {
    return tags.map((tag) => <Tag key={tag} name={tag} />);
  }, [tags]);
  useEffect(() => {
    setCurExpert({ ...curExpert, languages: selectedLangs.map((l) => l.id) });
  }, [selectedLangs]);
  useEffect(() => {
    setCurExpert({ ...curExpert, tags });
  }, [tags]);

  useEffect(() => {
    console.log(curExpert);
  }, [curExpert]);

  const handleCreate = (e: React.MouseEvent) => {
    e.preventDefault();
    insertExpert(curExpert);
  };

  return (
    <>
      <Button onPress={onOpen} onClick={handleOpening} color="primary">
        Add user
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-p flex flex-col gap-1 text-xl text-secondary">
                Ajoutez un nouvel expert
              </ModalHeader>
              <ModalBody className="relative">
                <div className="absolute">
                  <ToastContainer position="top-right" />
                </div>

                <form
                  onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();

                    const formData = new FormData(e.target as HTMLFormElement);
                    var object: any = {};
                    formData.forEach((value, key) => (object[key] = value));
                    // addExpert(object);

                    onClose();
                  }}
                  className="grid grid-cols-2 gap-2 text-foreground"
                >
                  <Input
                    label="Nom"
                    name="lastName"
                    type="Text"
                    variant="bordered"
                    isRequired
                    size="sm"
                    color="primary"
                    classNames={{ label: "font-semibold" }}
                    className="col-span-1"
                    value={curExpert.lastName}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCurExpert({ ...curExpert, lastName: e.target.value })
                    }
                  />
                  <Input
                    label="Prenom"
                    name="firstName"
                    type="Text"
                    isRequired
                    size="sm"
                    color="primary"
                    classNames={{ label: "font-semibold" }}
                    variant="bordered"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCurExpert({ ...curExpert, firstName: e.target.value })
                    }
                    value={curExpert.firstName}
                  />
                  <Input
                    name="email"
                    endContent={
                      <MailIcon className="pointer-events-none flex-shrink-0 text-2xl text-default-400" />
                    }
                    label="Email"
                    isRequired
                    size="sm"
                    type="Email"
                    color="primary"
                    classNames={{ label: "font-semibold" }}
                    variant="bordered"
                    className="col-span-2"
                    value={curExpert.email}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCurExpert({ ...curExpert, email: e.target.value })
                    }
                  />
                  <Select
                    label="Choisir le domaine d'expertise"
                    isRequired
                    className="col-span-2"
                    color="primary"
                    size="sm"
                    classNames={{ label: "font-semibold" }}
                    variant="bordered"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCurExpert({ ...curExpert, domainId: e.target.value })
                    }
                  >
                    {domains.map((domain) => (
                      <SelectItem
                        key={domain.id}
                        className="text-commentary hover:text-foreground"
                      >
                        {domain.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Choisir la localisation"
                    isRequired
                    className="col-span-2"
                    color="primary"
                    size="sm"
                    classNames={{ label: "font-semibold" }}
                    variant="bordered"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCurExpert({ ...curExpert, locationId: e.target.value })
                    }
                  >
                    {locations.map((location) => (
                      <SelectItem
                        key={location.id}
                        className="text-commentary hover:text-foreground"
                      >
                        {location.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <div className="col-span-2 flex gap-2">
                    <Input
                      label="Tags"
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCurrentTag(e.target.value)
                      }
                      name="tags"
                      type="Text"
                      size="sm"
                      color="primary"
                      classNames={{ label: "font-semibold" }}
                      isInvalid={invalidTag.invalid}
                      errorMessage={invalidTag.message}
                      value={currentTag}
                      variant="bordered"
                    />
                    <Button
                      className="aspect-square min-w-fit border-0 px-0"
                      variant="ghost"
                      color="secondary"
                      size="lg"
                      radius="sm"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        addTag();
                      }}
                    >
                      <FaPlus className="pointer-events-none text-2xl" />
                    </Button>
                  </div>

                  {Tags.length > 0 && (
                    <div className="col-span-2 mb-2 flex flex-wrap gap-2 rounded-full border-2 border-default px-4 py-2">
                      {Tags}
                    </div>
                  )}
                  <Select
                    label="Années d'experiences"
                    variant="bordered"
                    color="primary"
                    className="font-semibold"
                    size="sm"
                    isRequired
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCurExpert({
                        ...curExpert,
                        experience: parseInt(e.target.value),
                      })
                    }
                  >
                    {Exp.map((exp) => (
                      <SelectItem key={exp.id} className="text-commentary">
                        {exp.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <div className="flex gap-2">
                    <Select
                      label="Langues"
                      variant="bordered"
                      color="primary"
                      className="font-semibold"
                      size="sm"
                      isInvalid={invalidLang.invalid}
                      errorMessage={invalidLang.message}
                      isRequired
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setCurrentLang(
                          languages.find((l) => l.id == e.target.value) || {
                            id: "",
                            name: "",
                          },
                        )
                      }
                    >
                      {languages.map((lang) => (
                        <SelectItem key={lang.id} className="text-commentary">
                          {lang.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Button
                      className="aspect-square min-w-fit border-0 px-0"
                      variant="ghost"
                      color="secondary"
                      size="lg"
                      radius="sm"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        addLang();
                      }}
                    >
                      <FaPlus className="pointer-events-none text-2xl" />
                    </Button>
                  </div>

                  {selectedLangs.length > 0 && (
                    <div className="col-span-2 mb-2 flex flex-wrap gap-2 rounded-full border-2 border-default px-4 py-2">
                      {Langs}
                    </div>
                  )}
                  <Textarea
                    isRequired
                    label="Description"
                    labelPlacement="inside"
                    // placeholder="Enter your description"
                    className="col-span-2"
                    variant="bordered"
                    classNames={{ label: "font-semibold" }}
                    color="primary"
                    onInput={(e: any) =>
                      setCurExpert({ ...curExpert, caption: e.target.value })
                    }
                    disableAutosize
                  />
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      type="submit"
                      isLoading={loading}
                      onClick={async (e: React.MouseEvent) => {
                        e.preventDefault();
                        setLoading(true);
                        try {
                          await insertExpert(curExpert);
                          await insertExpert(curExpert);
                          setLoading(false);
                          onClose();
                        } catch (error: any) {
                          toast.error(error.message);
                          setLoading(false);
                        }
                      }}
                    >
                      Add
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

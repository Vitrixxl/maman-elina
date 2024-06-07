import { typeLink } from "../../types";
const linksData = new Set<typeLink>([{ href: "/", label: "Accueil" }, { href: "/experts", label: "Nos experts", subLinks: [{ href: "experts/it", label: "Informatique" }, { href: "experts/", label: "Finance" }, { href: "experts/", label: "Ressources humaines" }, { href: "experts/", label: "Management" }] }, { href: "/reseau", label: "Notre reseau" }]);
export { linksData }

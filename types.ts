import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};



export type typeLink = {
    href: string;
    label: string;
    subLinks?: { href: string; label: string }[];
}
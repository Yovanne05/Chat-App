import { HiOutlineCog, HiOutlineHome } from "react-icons/hi";
import {LuMessageSquareText} from "react-icons/lu";
import { CardProps } from "../types/card.type";

export const cardList: CardProps[] = [
    {
        title: "Home",
        route: "/home",
        icon: HiOutlineHome,
        collapsed: false,
    },
    {
        title: "Messages",
        route: "/messages",
        icon: LuMessageSquareText,
        collapsed: false,
    },
    {
        title: "Settings",
        route: "/settings",
        icon: HiOutlineCog,
        collapsed: false,
    },
];

import { HiOutlineCog, HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import { CardProps } from "../types/card.type";
import {LuMessageSquareText} from "react-icons/lu";

export const cardList: CardProps[] = [
  {
    title: "Home",
    route: "/",
    icon: HiOutlineHome,
  },
  {
    title: "Messages",
    route: "/messages",
    icon: LuMessageSquareText,
  },
  {
    title: "Settings",
    route: "/settings",
    icon: HiOutlineCog,
  },
];
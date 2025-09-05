import { HiOutlineCog, HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import { CardProps } from "../types/card.type";

export const cardList: CardProps[] = [
  {
    title: "Home",
    route: "/",
    icon: HiOutlineHome,
  },
  {
    title: "Profile",
    route: "/profil",
    icon: HiOutlineUser,
  },
  {
    title: "Settings",
    route: "/settings",
    icon: HiOutlineCog,
  },
];
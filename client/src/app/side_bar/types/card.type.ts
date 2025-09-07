import { IconType } from "react-icons";

export type CardProps = {
  title: string;
  route: string;
  icon: IconType;
  collapsed : boolean;
};
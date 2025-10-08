import { CardProps } from "../types/card.type";
import Card from "./card.component";

export default function CardList({
  CardProps,
  collapsed,
}: {
  CardProps: Omit<CardProps, "collapsed">[];
  collapsed: boolean;
}) {
  return (
    <ul className="w-full space-y-1">
      {CardProps.map((card) => (
        <Card key={card.title} {...card} collapsed={collapsed} />
      ))}
    </ul>
  );
}

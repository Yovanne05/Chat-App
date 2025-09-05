import { CardProps } from "../types/card.type";
import Card from "./card.component";

export default function CardList({ CardProps }: { CardProps: CardProps[] }) {
    return (
        <ul>
            {CardProps.map((card) => (
                <Card key={card.title} {...card} />
            ))}
        </ul>
    );
}
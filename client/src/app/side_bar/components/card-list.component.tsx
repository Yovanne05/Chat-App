import {CardProps} from "../types/card.type";
import Card from "./card.component";

export default function CardList({CardProps, collapsed,}: { CardProps: CardProps[]; collapsed: boolean; }) {
    return (
        <ul className={collapsed ? "flex flex-col items-center" : "w-full"}>
            {CardProps.map((card) => (
                <Card key={card.title} {...card} collapsed={collapsed}/>
            ))}
        </ul>
    );
}
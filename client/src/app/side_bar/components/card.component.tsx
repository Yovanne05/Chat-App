import Link from "next/link";
import { CardProps } from "../types/card.type";
import { useState, useEffect } from "react";

export default function Card({ title, route, icon: Icon, collapsed }: CardProps) {
    const [showText, setShowText] = useState(!collapsed);

    useEffect(() => {
        if (!collapsed) {
            setShowText(true);
        } else {
            const timer = setTimeout(() => setShowText(false), 150);
            return () => clearTimeout(timer);
        }
    }, [collapsed]);

    return (
        <li className="relative w-full">
            <Link
                href={route}
                className={`flex items-center p-3 hover:bg-primary-dark rounded-lg transition-colors duration-300 ${collapsed ? 'justify-center' : ''}`}
            >
                <div className="flex items-center justify-center w-6 h-6">
                    <Icon className="text-2xl" />
                </div>
                <span
                    className={`transition-all duration-300 ease-in-out ${
                        showText ? 'opacity-100 ml-3 max-w-full' : 'opacity-0 ml-0 max-w-0'
                    }`}
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap', flex: showText ? 1 : 0 }}
                >
                    {title}
                </span>
            </Link>
        </li>
    );
}
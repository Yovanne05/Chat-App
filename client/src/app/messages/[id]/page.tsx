"use client";

import { useParams } from "next/navigation";

export default function MessagePage() {
    const params = useParams();
    const id = params.id as string;

    return (
        <div className="p-4 text-white">
            <h1 className="text-xl font-bold">
                Discussion avec l’ami {id}
            </h1>
        </div>
    );
}

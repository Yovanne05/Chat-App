"use client"

import React, { Suspense } from 'react';

export default function UsersPage() {
    return (
        <main>
            <Suspense fallback={<div>Chargement...</div>}>
            </Suspense>
        </main>
    );
}

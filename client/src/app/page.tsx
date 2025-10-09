"use client";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex">
      <main>{children}</main>
    </div>
  );
}

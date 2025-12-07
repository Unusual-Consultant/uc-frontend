
// this file is used to remove padding from files that doesnt need top padding like login and signup 

"use client";

import { usePathname } from "next/navigation";

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noPadding =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/mentee/dashboard");

  return (
    <main className={noPadding ? "min-h-screen" : "min-h-screen pt-20"}>
      {children}
    </main>
  );
}

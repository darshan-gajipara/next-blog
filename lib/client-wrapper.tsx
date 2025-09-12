"use client";

import { BlogProvider } from "@/app/context/BlogsContext";
import { usePathname } from "next/navigation";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Skip BlogProvider on /login and /register
  if (pathname === "/login" || pathname === "/register") {
    return <>{children}</>;
  }

  return <BlogProvider>{children}</BlogProvider>;
}

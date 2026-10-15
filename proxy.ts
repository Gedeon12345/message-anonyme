import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

// Next.js 16+ : fichier "proxy.ts" et fonction "proxy".
// Next.js 15 : renomme ce fichier en "middleware.ts" et la fonction en "middleware".
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/connexion", "/inscription"],
};

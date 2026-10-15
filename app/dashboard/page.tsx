import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions/auth";
import { btnOutline, cardCls } from "@/lib/ui";

async function DashboardContent() {
  await connection(); // page rendue à chaque requête (données propres à l'utilisateur)

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  return (
    <>
      <h1 className="text-3xl font-extrabold">Ma boîte</h1>

      <div className={cardCls}>
        <p className="text-sm font-bold">Ton lien à partager</p>
        <p className="break-all text-lg font-extrabold">/u/{profile?.username}</p>
        <p className="text-sm text-[#4A4266]">
          La boîte de réception arrive en Phase 3.
        </p>
      </div>

      <form action={signOut} className="mt-auto">
        <button type="submit" className={btnOutline}>Se déconnecter</button>
      </form>
    </>
  );
}

export default function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-4 p-6">
      <Suspense fallback={<p className="text-muted-foreground">Chargement…</p>}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}

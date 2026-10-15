import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { btnPrimary, cardCls } from "@/lib/ui";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("public_profiles")
    .select("username, full_name, avatar_url")
    .eq("username", username.toLowerCase())
    .maybeSingle();

  if (!profile) notFound();

  const initials = (profile.full_name ?? profile.username).slice(0, 2).toUpperCase();

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-4 p-6">
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-3xl font-extrabold text-primary-foreground">
          {initials}
        </div>
        <p className="text-xl font-extrabold">@{profile.username}</p>
        <p className="text-muted-foreground">Envoie-moi un message anonyme</p>
      </div>

      {/* Formulaire actif en Phase 2 (modération + rate limiting) */}
      <div className={cardCls}>
        <textarea
          disabled
          maxLength={300}
          placeholder="Écris ton message ici…"
          className="h-36 resize-none bg-white text-base text-[#1A1033] outline-none"
        />
        <p className="text-right text-sm text-[#4A4266]">0 / 300</p>
        <button type="button" disabled className={btnPrimary}>
          Envoyer anonymement
        </button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Ton identité n&apos;est jamais révélée au destinataire.
      </p>

      <section className="mt-auto flex flex-col gap-3 rounded-3xl bg-[#1A1033] p-5 text-white">
        <p className="text-lg font-extrabold leading-snug">
          Toi aussi, découvre ce que tes amis pensent de toi !
        </p>
        <Link
          href="/inscription"
          className="flex h-12 items-center justify-center rounded-2xl bg-[#FFD400] font-extrabold text-[#1A1033]"
        >
          Crée ton lien anonyme
        </Link>
      </section>
    </main>
  );
}

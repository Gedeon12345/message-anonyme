import Link from "next/link";
import { btnOutline } from "@/lib/ui";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center gap-5 p-6">
      <h1 className="text-4xl font-extrabold leading-tight">
        Découvre ce que tes amis n&apos;osent pas te dire.
      </h1>
      <p className="text-muted-foreground">
        Crée ton lien, partage-le en story et reçois des messages anonymes.
      </p>
      <Link
        href="/inscription"
        className="flex h-12 items-center justify-center rounded-2xl bg-primary text-base font-bold text-primary-foreground"
      >
        Crée ton lien anonyme
      </Link>
      <Link href="/connexion" className={btnOutline}>
        J&apos;ai déjà un compte
      </Link>
    </main>
  );
}

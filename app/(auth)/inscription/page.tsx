import Link from "next/link";
import { SignupForm } from "@/components/signup-form";

export default function InscriptionPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-4 p-6">
      <h1 className="mt-4 text-3xl font-extrabold leading-tight">Crée ton lien anonyme</h1>
      <p className="text-muted-foreground">
        Reçois des messages de tes amis en quelques secondes.
      </p>
      <SignupForm />
      <p className="mt-auto pt-4 text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <Link href="/connexion" className="font-bold text-foreground underline">
          Connexion
        </Link>
      </p>
    </main>
  );
}

import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function ConnexionPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-4 p-6">
      <h1 className="mt-4 text-3xl font-extrabold leading-tight">Content de te revoir</h1>
      <LoginForm />
      <p className="mt-auto pt-4 text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="font-bold text-foreground underline">
          Crée ton lien
        </Link>
      </p>
    </main>
  );
}

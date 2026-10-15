"use client";

import { useActionState } from "react";
import { signIn, type FormState } from "@/app/actions/auth";
import { btnPrimary, cardCls, inputCls, labelCls } from "@/lib/ui";

export function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(signIn, {});

  return (
    <form action={action} className={cardCls}>
      <label htmlFor="email" className={labelCls}>E-mail</label>
      <input id="email" name="email" type="email" className={inputCls}
        autoComplete="email" required />

      <label htmlFor="password" className={labelCls}>Mot de passe</label>
      <input id="password" name="password" type="password" className={inputCls}
        autoComplete="current-password" required />

      {state.error && <p role="alert" className="text-sm font-bold text-[#B00020]">{state.error}</p>}

      <button type="submit" className={btnPrimary} disabled={pending}>
        {pending ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}

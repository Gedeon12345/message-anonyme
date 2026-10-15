"use client";

import { useActionState, useEffect, useState } from "react";
import { signUp, type FormState } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { USERNAME_REGEX } from "@/lib/validation";
import { btnPrimary, cardCls, inputCls, labelCls } from "@/lib/ui";

type Status = "idle" | "invalid" | "checking" | "available" | "taken" | "error";

export function SignupForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(signUp, {});
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!username) {
      setStatus("idle");
      return;
    }
    if (!USERNAME_REGEX.test(username)) {
      setStatus("invalid");
      return;
    }
    setStatus("checking");
    const timer = setTimeout(async () => {
      const { data, error } = await createClient().rpc("username_available", {
        p_username: username,
      });
      if (error) {
        console.error(error);
        setStatus("error");
        return;
      }
      setStatus(data ? "available" : "taken");
    }, 400);
    return () => clearTimeout(timer);
  }, [username]);

  const hint: Record<Status, { text: string; color: string, error: string } | null> = {
    idle: null,
    invalid: { text: "3 à 15 caractères : minuscules, chiffres, _", color: "#B00020", error: "Ce pseudo est invalide" },
    checking: { text: "Vérification…", color: "#4A4266", error: "Une erreur est survenue" },
    available: { text: `/u/${username} est disponible`, color: "#0B7A4B", error: "Ce pseudo est déjà pris" },
    taken: { text: "Ce pseudo est déjà pris", color: "#B00020", error: "Ce pseudo est déjà pris" },
    error: { text: "Une erreur est survenue", color: "#B00020", error: "Une erreur est survenue" },
  };
  const current = hint[status];

  return (
    <form action={action} className={cardCls}>
      <label htmlFor="username" className={labelCls}>Pseudo</label>
      <input
        id="username"
        name="username"
        className={inputCls}
        placeholder="lea_m"
        autoComplete="username"
        maxLength={15}
        value={username}
        onChange={(e) => setUsername(e.target.value.toLowerCase())}
        required
      />
      {current && (
        <p className="text-sm font-bold" style={{ color: current.color }}>
          {current.text}
        </p>
      )}

      <label htmlFor="email" className={labelCls}>E-mail</label>
      <input id="email" name="email" type="email" className={inputCls}
        placeholder="toi@exemple.com" autoComplete="email" required />

      <label htmlFor="password" className={labelCls}>Mot de passe</label>
      <input id="password" name="password" type="password" className={inputCls}
        placeholder="8 caractères minimum" autoComplete="new-password" minLength={8} required />

      {state.error && <p role="alert" className="text-sm font-bold text-[#B00020]">{state.error}</p>}
      {state.message && <p role="status" className="text-sm font-bold text-[#0B7A4B]">{state.message}</p>}

      <button type="submit" className={btnPrimary} disabled={pending || status === "taken" || status === "invalid"}>
        {pending ? "Création…" : "Créer mon compte"}
      </button>
    </form>
  );
}

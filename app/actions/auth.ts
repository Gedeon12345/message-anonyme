"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { USERNAME_REGEX } from "@/lib/validation";

export type FormState = { error?: string; message?: string };

export async function signUp(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const username = String(formData.get("username") ?? "").trim().toLowerCase();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!USERNAME_REGEX.test(username)) {
      return { error: "Pseudo invalide (3 à 15 caractères : minuscules, chiffres, _)." };
    }
    if (password.length < 8) {
      return { error: "Mot de passe : 8 caractères minimum." };
    }

    const supabase = await createClient();

    const { data: available, error: rpcError } = await supabase.rpc("username_available", {
      p_username: username,
    });
    if (rpcError) return { error: "Impossible de vérifier le pseudo. Réessaie." };
    if (!available) return { error: "Ce pseudo est déjà pris." };

    const origin = (await headers()).get("origin") ?? "";
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) return { error: error.message };
    if (!data.session) {
      return { message: "Vérifie ta boîte mail pour confirmer ton compte." };
    }
  } catch {
    return { error: "Une erreur est survenue. Réessaie." };
  }
  redirect("/dashboard");
}

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: "E-mail ou mot de passe incorrect." };
  } catch {
    return { error: "Une erreur est survenue. Réessaie." };
  }
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

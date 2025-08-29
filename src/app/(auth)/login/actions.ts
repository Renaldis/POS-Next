"use server";

import { INITIAL_STATE_LOGIN_FORM } from "@/constant/auth-constant";
import { createClient } from "@/lib/supabase/server";
import { AuthFormState } from "@/types/auth";
import { loginSchemaForm } from "@/validations/auth-validation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  prevState: AuthFormState,
  formData: FormData | null
) {
  if (!formData) {
    return INITIAL_STATE_LOGIN_FORM;
  }

  const validatedFields = loginSchemaForm.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  const supabase = await createClient();

  const {
    error,
    data: { user },
  } = await supabase.auth.signInWithPassword(validatedFields.data);

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (profile) {
    const cookieStore = await cookies();
    cookieStore.set("user_profile", JSON.stringify(profile), {
      httpOnly: true, //Cookie tidak bisa diakses lewat JavaScript di browser
      path: "/", //Cookie berlaku untuk semua path di domain.
      sameSite: "lax", //Cookie hanya dikirim untuk request dari domain yang sama (mengurangi risiko CSRF).
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  revalidatePath("/", "layout"); //Memaksa Next.js untuk merefresh cache halaman / khusus bagian layout. Jadi, perubahan data bisa langsung terlihat tanpa menunggu revalidasi otomatis.
  redirect("/"); //Setelah semuanya selesai, user diarahkan ke halaman home (/).
}

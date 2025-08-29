"use client";

import FormInput from "@/components/common/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  INITIAL_LOGIN_FORM,
  INITIAL_STATE_LOGIN_FORM,
} from "@/constant/auth-constant";
import { LoginForm, loginSchemaForm } from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchemaForm),
    defaultValues: INITIAL_LOGIN_FORM,
  });

  const [loginState, loginAction, isPendingLogin] = useActionState(
    login,
    INITIAL_STATE_LOGIN_FORM
  );

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // start transition -> function dari React untuk menandai bahwa update ini bukan prioritas utama,
    // sehingga UI tetap responsif (tidak nge-freeze). Biasanya dipakai untuk action async atau navigasi.
    startTransition(() => {
      loginAction(formData);
    });
    // loginAction(formData) → memanggil server action login dengan data form. Nanti hasilnya otomatis update ke loginState dan isPendingLogin.
  });

  useEffect(() => {
    if (loginState?.status === "error") {
      toast.error("Login failed", {
        description: loginState.errors._form,
      });
      startTransition(() => {
        loginAction(null);
      });
    }
  }, [loginState]);
  console.log(loginState);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome</CardTitle>
        <CardDescription>Login to access al features</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormInput
              form={form}
              type="email"
              name="email"
              label="Email"
              placeholder="Insert email here"
            />
            <FormInput
              form={form}
              type="password"
              name="password"
              label="Password"
              placeholder="******"
            />
            <Button type="submit">
              {isPendingLogin ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

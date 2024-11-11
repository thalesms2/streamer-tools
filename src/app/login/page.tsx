"use server";

import { login } from "@/actions/auth";
import LoginForm from "@/components/login-form";
import { IFormData } from "@/types/login";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  async function loginAction(data: IFormData) {
    "use server";
    const result = await login(data);
    if(result)
      redirect('/settings');
  }
  return (
    <div className="flex h-[90vh] justify-center items-center">
      <LoginForm loginAction={loginAction} />
    </div>
  );
}

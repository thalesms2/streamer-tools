"use server";

import { login } from "@/actions/auth";
import LoginForm from "@/components/login-form";
import { IFormData } from "@/types/login";

export default async function LoginPage() {
  async function loginAction(data: IFormData) {
    "use server";
    await login(data);
  }
  return (
    <div className="flex h-[90vh] justify-center items-center">
      <LoginForm loginAction={loginAction} />
    </div>
  );
}

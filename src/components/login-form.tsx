"use client";

import type { z } from "zod";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "@/lib/loginDefinition";
import { zodResolver } from "@hookform/resolvers/zod";
import type { IFormData } from "@/types/login";

export default function LoginForm({
  loginAction,
}: {
  loginAction: (data: IFormData) => Promise<any> | string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
  });
  const inputStyle = "bg-slate-800 text-white border border-slate-400 rounded-md p-1"
  return (
    <div className="flex h-[90vh] justify-center items-center">
      <form onSubmit={handleSubmit(loginAction)} className="p-2 flex flex-col gap-1">
        <input type="text" className={inputStyle} {...register("username")} />
        {errors.username?.message && errors.username?.message}
        <input type="password" className={inputStyle} {...register("password")} />
        {errors.password?.message && errors.password?.message}
        <input type="submit" value="Entrar" />
      </form>
    </div>
  );
}

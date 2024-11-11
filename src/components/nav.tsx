"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ValidateExibition from "./validate-exibition";

export default function Nav({
  hasSession,
  logoutAction,
}: {
  hasSession: boolean;
  logoutAction: () => void;
}) {
  const [, , username] = usePathname().split("/");
  return (
    <nav className="min-h-12 flex items-center justify-between">
      <div className="flex gap-x-4">
        <ValidateExibition show={username != null}>
          <Link href={`/streamer/${username}`}>Links</Link>
          <Link href={`/streamer/${username}/commands`}>Comandos</Link>
        </ValidateExibition>
        <ValidateExibition show={username == null}>
          <Link href={`/`}>Home</Link>
          <Link href={`/streamer/`}>Streamers</Link>
        </ValidateExibition>
      </div>
      <div className="flex gap-x-4">
        <ValidateExibition show={!hasSession}>
          <Link href={`/login`}>Login</Link>
        </ValidateExibition>
        <ValidateExibition show={hasSession}>
          <Link href={`/settings`}>Configurações</Link>
          <Link href={`/login`} onClick={logoutAction}>
            Sair
          </Link>
        </ValidateExibition>
      </div>
    </nav>
  );
}

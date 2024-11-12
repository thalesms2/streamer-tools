"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ValidateExibition from "./validate-exibition";
import { useEffect, useState } from "react";

export default function Nav({
  logoutAction,
  validateSession,
}: {
  logoutAction: () => void;
  validateSession: () => Promise<boolean>;
}) {
  const [hasSession, setHasSession] = useState(false)
  const [, , username] = usePathname().split("/");
  const handleLogoutAction = () => {
    logoutAction();
  };
  useEffect(() => {
    validateSession().then(session => {
      setHasSession(session)
    })
  })
  
  return (
    <nav className="min-h-12 flex items-center justify-between">
      <div className="flex gap-x-4">
        <ValidateExibition show={hasSession || username == null}>
          <Link href={`/`}>Home</Link>
          <Link href={`/streamer/`}>Streamers</Link>
        </ValidateExibition>
        <ValidateExibition show={username != null}>
          <Link href={`/streamer/${username}`}>Links</Link>
          <Link href={`/streamer/${username}/commands`}>Comandos</Link>
        </ValidateExibition>
      </div>
      <div className="flex gap-x-4">
        <ValidateExibition show={!hasSession}>
          <Link href={`/login`}>Login</Link>
        </ValidateExibition>
        <ValidateExibition show={hasSession}>
          <Link href={`/settings`}>Configurações</Link>
          <Link href={`/login`} onClick={handleLogoutAction}>
            Sair
          </Link>
        </ValidateExibition>
      </div>
    </nav>
  );
}

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import ValidateExibition from "@/components/validate-exibition";
import { useEffect, useState } from "react";

export default function Nav({
  logoutAction,
  validateSession,
}: {
  logoutAction: () => void;
  validateSession: () => Promise<boolean>;
}) {
  const [hasSession, setHasSession] = useState(false)
  const [, pathname, streamer, streamerPathname] = usePathname().split("/");
  const handleLogoutAction = () => {
    logoutAction();
  };
  useEffect(() => {
    validateSession().then(session => {
      setHasSession(session)
    })
  })
  const changeColor = (route: string) => {
    if (route == pathname && !streamer || route == streamerPathname || (route == streamer && streamerPathname == null)) {
      return "transition-colors hover:text-foreground/80 text-foreground";
    }
    return "transition-colors hover:text-foreground/80 text-foreground/60";
  };
  
  return (
    <nav className="min-h-12 flex items-center justify-between">
      <div className="flex gap-x-4">
        <ValidateExibition show={hasSession || streamer == null}>
          <Link className={changeColor('')} href={`/`}>Home</Link>
          <Link className={changeColor('streamer')} href={`/streamer/`}>Streamers</Link>
        </ValidateExibition>
        <ValidateExibition show={streamer != null}>
          <Link className={changeColor(streamer)} href={`/streamer/${streamer}`}>Links</Link>
          <Link className={changeColor('commands')} href={`/streamer/${streamer}/commands`}>Comandos</Link>
        </ValidateExibition>
      </div>
      <div className="flex gap-x-4 items-center">
        <ValidateExibition show={!hasSession}>
          <Link className={changeColor('login')} href={`/login`}>Login</Link>
        </ValidateExibition>
        <ValidateExibition show={hasSession}>
          <Link className={changeColor('settings')} href={`/settings`}>Configurações</Link>
          <Link className={changeColor('logout')} href={`/login`} onClick={handleLogoutAction}>
            Sair
          </Link>
        </ValidateExibition>
      </div>
    </nav>
  );
}

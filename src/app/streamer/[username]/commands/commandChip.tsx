"use client";

import { useToast } from "@/hooks/use-toast"
import { wrapper, exclamationPoint, command } from "@/components/style/commands";

interface IProps {
  data: { id: number; streamerId: number; command: string; };
  theme: string;
}

export default function CommandChip(props: IProps) {
  const { toast } = useToast()
  function copyToClipBoard() {
    navigator.clipboard.writeText(`!${props.data.command}`);
    toast({
      title: props.data.command.toUpperCase(),
      description: "Comando copiado para o clipboard",
    })
  }
  return (
    <button onClick={copyToClipBoard}>
      <div className={wrapper[props.theme]}>
        <span className={exclamationPoint[props.theme]}>!</span>
        <span className={command[props.theme]} >{props.data.command}</span>
      </div>
    </button>
  );
}

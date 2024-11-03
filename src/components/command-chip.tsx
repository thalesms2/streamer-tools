'use client'

import { toast } from 'react-toastify';

interface IProps {
  data: { id: number, streamerId: number, command: string }
}

export default function CommandChip(props: IProps) {
  function copyToClipBoard() {
    navigator.clipboard.writeText(`!${props.data.command}`)
    toast.info("Comando copiado para o clipboard")
  }
  return (
    <button onClick={copyToClipBoard}>
      <div className='bg-slate-500 rounded-lg text-center p-2'>
        <span className='text-fuchsia-500'>!</span>{props.data.command}
      </div>
    </button>
  )
}
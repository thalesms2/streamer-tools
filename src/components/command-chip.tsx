'use client'

interface IProps {
  data: { id: number, streamerId: number, command: string }
}

export default function CommandChip(props: IProps) {
  function copyToClipBoard() {
    navigator.clipboard.writeText(props.data.command)
  }
  return (
    <button onClick={copyToClipBoard}>
      <div className='bg-slate-500 rounded-lg text-center p-2' key={props.data.id}>
        <span className='text-fuchsia-500'>!</span>{props.data.command}
      </div>
    </button>
  )
}
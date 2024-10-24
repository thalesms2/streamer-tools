import prisma from '@/lib/prisma'

export default async function Commands({ params }: { params: { userName: string } }) {
  const { userName } = await params;
  const streamer = await prisma.streamer.findUnique({
    where: {
      userName: userName
    }
  })
  let commands
  if(streamer != null) {
    commands = await prisma.commands.findMany({
      where: {
        streamerId: streamer.id
      }
    })
  }
  return (
    <div>
      {userName}
      <div className='grid grid-cols-4 mx-[200px] gap-2'>
        {commands?.map(command => {
          return(
            <div className='bg-slate-500 rounded-lg text-center p-2' key={command.id}>
              {command.command}
            </div>
          )
        })}
      </div>
    </div>
  )
}
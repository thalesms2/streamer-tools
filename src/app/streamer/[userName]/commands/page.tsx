import CommandChip from '@/components/command-chip';
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
      <h1>
        {userName}
      </h1>
      <div className='grid grid-cols-5 xl:mx-[300px] lg:mx-[200px] md:mx-[100px] sm:mx-[20px] gap-3'>
        {commands?.map(command => {
          return(
            <CommandChip data={command} key={command.id}/>
          )
        })}
      </div>
    </div>
  )
}
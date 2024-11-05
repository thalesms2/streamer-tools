import CommandChip from '@/components/command-chip';
import prisma from '@/lib/prisma'
import { ICommands } from '@/types/commands';
import { IStreamer } from '@/types/streamer';

export const dynamicParams = true;

export async function generateStaticParams() {
  const streamer = await prisma.streamer.findMany();
  return streamer.map((streamer) => ({
    userName: String(streamer.userName),
  }))
}

export default async function Commands({ params }: { params: Promise<{ userName: string }> }) {
  const { userName } = await params;
  const streamer: IStreamer = await prisma.streamer.findUnique({
    where: {
      userName: userName,
    }
  });

  const commands: ICommands[] = await prisma.commands.findMany({
    where: {
      streamerId: streamer.id,
    }
  });

  return (
    <div>
      <h1>
        {streamer.userName}
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
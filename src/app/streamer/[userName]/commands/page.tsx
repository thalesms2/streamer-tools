import CommandChip from '@/components/command-chip';
import prisma from '@/lib/prisma'
import { ICommands } from '@/types/command';
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
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3'>
        {commands?.map(command => {
          return(
            <CommandChip data={command} key={command.id}/>
          )
        })}
      </div>
    </div>
  )
}
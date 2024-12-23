'use server';

import ConfigureInformation from "./information";
import UploadAvatar from "./uploadAvatar";
import type IInformationData from "@/types/informationData";
import { returnId } from "@/lib/session";
import prisma from "@/lib/prisma";

export default async function SettingsPage() {
  const id = await returnId();
  const streamer = await prisma.streamer.findUnique({
    where: {
      id: Number(id)
    }
  })
  
  const socialsDb = await prisma.social.findMany({
    where: {
      streamerId: streamer.id
    }
  })

  async function saveInformation(data: IInformationData) {
    "use server";
    let socials = []
    const socialsDb = await prisma.social.findMany({
      where: {
        streamerId: streamer.id
      }
    })
    let theme
    for (const [key, value] of Object.entries(data)) {
      if(key != 'theme' && value != undefined && value.length > 1) {
        socials.push({
          title: key,
          link: value,
          streamerId: streamer.id
        })
      } else if(key == 'theme') {
        theme = value
      }
    }
    let socialsFiltered = socials.filter(
      (social) => !socialsDb.some((socialDb) => socialDb.link == social.link)
    )
    const result = await prisma.social.createMany({
      data: socialsFiltered,
    })
    const update = await prisma.streamer.update({
      where: {
        id: streamer.id
      },
      data: {
        theme: theme
      }
    })
  }

  async function deleteSocial(title: string) {
    "use server";
    await prisma.social.deleteMany({
      where: {
        title: title,
        streamerId: streamer.id
      }
    })
  }

  return(
    <main className="flex min-h-[80vh] flex-col items-center justify-between p-24">
      <ConfigureInformation
        saveAction={saveInformation} 
        streamer={streamer} 
        socials={socialsDb}
        deleteSocial={deleteSocial}
      />
    </main>
  )
}

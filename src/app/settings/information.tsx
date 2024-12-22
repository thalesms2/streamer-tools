'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import InformationSchema from "./information-schema"
import { Theme } from "@prisma/client";
import { IStreamer } from "@/types/streamer";
import { useEffect } from "react";
import { ISocial } from "@/types/social";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const options: { value: keyof z.infer<typeof InformationSchema>, label: string }[] = [
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'discord', label: 'Discord' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'Youtube' },
  { value: 'github', label: 'Github' },
  { value: 'bluesky', label: 'Bluesky' },
  { value: 'threads', label: 'Threads' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'twitch', label: 'Twitch' }
]

const themes = [
  { value: Theme.PINK, label: 'Pink' },
  { value: Theme.DARK, label: 'Dark' },
  { value: Theme.BLACKNWHITE, label: 'Black and White' },
  { value: Theme.HANNA, label: 'Hanna' },
  { value: Theme.SATO, label: 'Sato' }
]

export default function ConfigureInformation({
  saveAction,
  streamer,
  socials,
  deleteSocial,
}: {
  saveAction: (data: z.infer<typeof InformationSchema>) => Promise<any> | string
  streamer: IStreamer
  socials: ISocial[]
  deleteSocial: (title: string) => void
}) {
  const form = useForm<z.infer<typeof InformationSchema>>({
    resolver: zodResolver(InformationSchema),
  })
  useEffect(() => {
    form.setValue('theme', streamer.theme)
    socials.forEach(social => {
      form.setValue(social.title as keyof z.infer<typeof InformationSchema>, social.link)
    })
  })
  const clearSocial = (input) => {
    deleteSocial(input)
    form.setValue(input, '')
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(saveAction)} className="space-y-2">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tema dos comandos</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-[500px]">
                      <SelectValue placeholder="Tema de comandos" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {themes.map(theme => {
                      return (
                        <SelectItem key={theme.value} value={theme.value}>
                          {theme.label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Sociais</AccordionTrigger>
              <AccordionContent>
                {options.map(social => {
                  return (
                    <div key={social.value} className="flex flex-row justify-center items-end space-x-2">
                      <FormField
                        control={form.control}
                        name={social.value}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{social.label}</FormLabel>
                            <FormControl>
                              <Input className="w-[500px]" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button onClick={() => clearSocial(social.value)} type="reset">Excluir</Button>
                    </div>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  )
}

import { z } from "zod"

const InformationSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  discord: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
  github: z.string().optional(),
  bluesky: z.string().optional(),
  threads: z.string().optional(),
  twitter: z.string().optional(),
  twitch: z.string().optional(),
  theme: z.string(),
})

export default InformationSchema;
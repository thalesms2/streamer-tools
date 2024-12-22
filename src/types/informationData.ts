import { Theme } from "@prisma/client";

export default interface IInformationData {
  theme: Theme;
  facebook: string;
  instagram: string;
  discord: string;
  tiktok: string;
  youtube: string;
  github: string;
  bluesky: string;
  threads: string;
  twitter: string;
  twitch: string;
}
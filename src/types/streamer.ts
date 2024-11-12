import { Theme } from "@prisma/client";

export interface IStreamer {
  id: number;
  username: string;
  secret: string;
  theme: Theme
}

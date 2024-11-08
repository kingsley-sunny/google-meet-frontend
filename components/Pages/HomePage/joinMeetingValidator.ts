import { z } from "zod";

export const joinMeetingValidator = z.object({
  meeting_link: z.string(),
});

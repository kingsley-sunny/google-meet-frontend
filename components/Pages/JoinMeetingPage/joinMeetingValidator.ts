import { z } from "zod";

export const joinMeetingValidator = z.object({
  name: z.string().optional(),
  meeting_id: z.string().uuid(),
});

export type joinMeetingFormType = z.infer<typeof joinMeetingValidator>;

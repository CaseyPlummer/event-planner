import { DateTime } from 'luxon';
import { z, ZodType } from "zod";
import type { Event } from "../server/remote-events";

export const zDateTime = z.string().refine(
    (value) => DateTime.fromISO(value).isValid,
    (value) => ({
      message: `${DateTime.fromISO(value).invalidExplanation}`,
    }),
  );

export const eventSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().optional(),
    date: zDateTime,
}) satisfies ZodType<Event>;

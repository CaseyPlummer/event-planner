import { createEvent } from "$lib/server/remote-events";
import { eventSchema } from "$lib/validation/schemas";
import { fail, redirect } from "@sveltejs/kit";
import { DateTime } from "luxon";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({request}) => {
        const formdata = await request.formData();
        const title = formdata.get('title')?.toString();
        const description = formdata.get('description')?.toString();
        const date = formdata.get('date')?.toString();

        const createSchema = eventSchema        
            .omit({id: true})
            .refine(e => {
                const when = DateTime.fromISO(e.date);
                return when > DateTime.now();
            }, {message: 'The event must be in the future'});
        const parsed = createSchema.safeParse({title, description, date});

        if (parsed.success) {       
            const { data } = parsed;
            const newEvent = await createEvent({title: data.title, description: data.description, date: data.date});
            redirect(303, `/${newEvent.id}`);
        }

        return fail(422, {
            error: parsed.error.errors[0].message
        });
    }
}
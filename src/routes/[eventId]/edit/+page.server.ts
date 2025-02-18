import { fetchEventById, updateEventById } from "$lib/server/remote-events";
import { eventSchema } from "$lib/validation/schemas";
import { DateTime } from "luxon";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    const eventId = parseInt(params.eventId);
    return {
        streamed: {
            event: fetchEventById(eventId)
        }  
    }
}

export const actions: Actions = {
    default: async ({request, params}) => {
        const eventId = parseInt(params.eventId);
        const formdata = await request.formData();
        const title = formdata.get('title')?.toString();
        const description = formdata.get('description')?.toString();
        const date = formdata.get('date')?.toString();

        const editSchema = eventSchema        
            .refine(e => {
                const when = DateTime.fromISO(e.date);
                return when > DateTime.now();
            }, {message: 'The event must be in the future'});
        const parsed = editSchema.safeParse({id: eventId, title, description, date});

        if (parsed.success) {       
            const { data } = parsed;
            await updateEventById(eventId, {title: data.title, description: data.description, date: data.date});
            redirect(303, `/${eventId}`);
        }
        return fail(422, {
            error: parsed.error.errors[0].message
        });     
    }
}
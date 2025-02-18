import { fetchAllEvents, deleteEventById } from "$lib/server/remote-events";
import type { Actions, PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {    
    return {
        streamed: {
			events: fetchAllEvents()
		}        
    }
};

export const actions: Actions = {
    delete: async ({ request}) => {
        const formdata = await request.formData();
        const id = formdata.get('id')?.toString()
        const eventId = id ? parseInt(id) : undefined;
        
        if (!eventId) {
            error(400, 'The event ID is required.');
        }                   
        const success = await deleteEventById(eventId);
        
        if (success) {
            redirect(303, `/`);
        }
        else {
            error(400, `The event with ID ${eventId} could not be deleted.`);
        }        
    }
}

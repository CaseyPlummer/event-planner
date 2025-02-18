<script lang="ts">
    import { enhance } from '$app/forms';
    import type { Event } from '../server/remote-events';

    interface Props {
        form?: unknown;
        event?: Event;
    }    
    let { form, event }: Props = $props();
    let saving = $state(false);    
</script>

<form method="POST"
    use:enhance={() => {
        saving = true;

        return async ({ update }) => {
            await update();
            saving = false;
        };
    }}>
    
    <label for="title">Title</label>
    <input type="text" id="title" name="title" required disabled={saving} value={event?.title}>

    <textarea id="description" name="description" rows="4" cols="50" placeholder="Description" disabled={saving} value={event?.description}></textarea>

    <label for="date">Date</label>
    <input type="datetime-local" id="date" name="date" required disabled={saving} value={event?.date}>

    <button type="submit" class="inline-flex items-center" disabled={saving}>
        {#if saving}
            <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Saving...
        {:else}
            {event ? 'Update' : 'Create'} Event
        {/if}
    </button>
</form>
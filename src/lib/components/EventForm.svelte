<script lang="ts">
    import { enhance } from '$app/forms';
    import type { Event } from '../server/remote-events';
    import Spinner from './Spinner.svelte';

    interface Props {
        form?: { error: string; };
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
            <Spinner /> Saving...
        {:else}
            {event ? 'Update' : 'Create'} Event
        {/if}
    </button>
	{#if form?.error}
        <p class="mt-2 text-red-400">{form?.error}</p>
	{/if}
</form>
<script lang="ts">
    import EventForm from '$lib/components/EventForm.svelte';
    import type { ActionData, PageData } from './$types';

    interface Props {
        data: PageData, 
        form: ActionData & { error?: string; }
    }    
    let {data, form}: Props = $props();
</script>

{#await data.streamed.event}
    <p>Loading...</p>
{:then event}
{#if event}
    <EventForm {form} {event} />
{/if}
{/await}
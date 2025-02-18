<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";

    let {data}: {data: PageData} = $props();

    let deletingId : number | undefined = $state(undefined);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1 class="text-xl">Events</h1>

{#await data.streamed.events}
    <p>Loading...</p>
{:then events}
    {#each events as event}
        <div>
            <h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date}</p>
            <p class="inline-flex items-center" >
                <a class="btn {deletingId ? 'disabled' : ''}" href="{deletingId ? '' : '/' + event.id + '/edit'}" role="{deletingId ? 'link' : 'button'}" aria-disabled={!!deletingId}>Edit Event</a>

                <form method="POST" action="?/delete" class="inline-flex ml-2" 
                use:enhance={() => {
                    
                    deletingId = event.id;            
                    return async ({ update }) => {
                        await update();
                        deletingId = undefined;
                    };
                }}>
                
                <input type="text" id="id" name="id" class="hidden" value={event?.id}>               
            
                <button type="submit" class="btn inline-flex items-center" disabled={!!deletingId}>
                    {#if deletingId === event.id}
                        <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Deleting...
                    {:else}
                        Delete Event
                    {/if}
                </button>
            </form>


        </div>
    {/each}
{/await}

<a class="btn mt-2" href="/add" role="button">Add Event</a>

<style>
    .btn.disabled {
    @apply cursor-not-allowed;
    } 
</style>



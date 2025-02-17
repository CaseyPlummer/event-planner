<script lang="ts">
	import type { PageData } from "./$types";

    let {data}: {data: PageData} = $props();
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
            <p><a class="btn" href="/{event.id}/edit" role="button">Edit Event</a></p>
        </div>
    {/each}
{/await}

<a class="btn" href="/add" role="button">Add Event</a>
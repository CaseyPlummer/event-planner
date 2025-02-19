<script lang="ts">
	import { enhance } from '$app/forms';
	import Spinner from '$lib/components/Spinner.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let deletingId: number | undefined = $state(undefined);
</script>

<h1 class="text-xl">Events</h1>

{#await data.streamed.events}
	<p>Loading...</p>
{:then events}
	{#each events as event}
		<div>
			<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
			<p>{event.description}</p>
			<p>{event.date}</p>
			<p class="inline-flex items-center">
				<a
					class="btn {deletingId ? 'disabled' : ''}"
					href={deletingId ? '' : '/' + event.id + '/edit'}
					role={deletingId ? 'link' : 'button'}
					aria-disabled={!!deletingId}>Edit Event</a
				>
			</p>
			<form
				method="POST"
				action="?/delete"
				class="inline-flex ml-2"
				use:enhance={() => {
					deletingId = event.id;
					return async ({ update }) => {
						await update();
						deletingId = undefined;
					};
				}}
			>
				<input type="text" id="id" name="id" class="hidden" value={event?.id} />

				<button type="submit" class="btn inline-flex items-center" disabled={!!deletingId}>
					{#if deletingId === event.id}
						<Spinner /> Deleting...
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

<script lang="ts">
	import { enhance } from '$app/forms';
	import Spinner from '$lib/components/Spinner.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { formatDate } from '$lib/dates';

	let { data }: { data: PageData } = $props();
	let deletingId: number | undefined = $state(undefined);

	const goToEdit = (id: number) => goto(`/${id}/edit`);
</script>

<h1 class="text-xl bold">Events</h1>

<div class="events mt-4">
	{#await data.streamed.events}
		<p>Loading...</p>
	{:then events}
		{#each events as event}
			<div class="card bg-base-100 w-96 shadow-xl">
				<div class="card-body">
					<div class="card-header flex">
						<h2 class="card-title">{event.title}</h2>
						<span class="flex-grow"></span>
						<span class="mt-2 text-xs">ID</span>
						<span class="mt-2 text-xs ml-1 font-bold">{event.id}</span>
					</div>
					<p>{event.description}</p>
					<p>{formatDate(event.date)}</p>
					<div class="card-actions justify-end mt-4">
						<button
							class="btn btn-primary"
							onclick={() => goToEdit(event.id)}
							disabled={!!deletingId}>Edit Event</button
						>
						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								deletingId = event.id;
								return async ({ update }) => {
									await update();
									deletingId = undefined;
								};
							}}
						>
							<input type="text" id="id" name="id" class="hidden" value={event?.id} />
							<button type="submit" class="btn btn-neutral" disabled={!!deletingId}>
								{#if deletingId === event.id}
									<Spinner /> Deleting...
								{:else}
									Delete Event
								{/if}
							</button>
						</form>
					</div>
				</div>
			</div>
		{/each}
	{/await}
</div>

<a class="btn mt-6" href="/add" role="button">Add Event</a>

<style>
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { formatDate } from '$lib/dates';

	let { data }: { data: PageData } = $props();
	let deletingId: number | undefined = $state(undefined);

	const goToEdit = (id: number) => goto(`/${id}/edit`);
	const showModal = (id: string) => {
		const found = document?.getElementById(id);
		const element = found ? (found as HTMLFormElement) : undefined;
		if (element) {
			element.showModal();
		}
	};
	const closeModal = (id: string) => {
		const found = document?.getElementById(id);
		const element = found ? (found as HTMLFormElement) : undefined;
		if (element) {
			element.close();
		}
	};
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
						<button class="btn btn-neutral" onclick={() => showModal(`delete_confirm_${event.id}`)}
							>Delete Event</button
						>

						<dialog id={`delete_confirm_${event.id}`} class="modal">
							<div class="modal-box">
								<h3 class="text-lg font-bold">Confirm</h3>
								<p class="py-4">Are you sure you wish to delete this event?</p>
								<div class="modal-actionasdf">
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
										<div class="modal-action">
											<button
												type="button"
												class="btn btn-neutral"
												disabled={!!deletingId}
												onclick={() => closeModal(`delete_confirm_${event.id}`)}>Cancel</button
											>
											<button type="submit" class="btn btn-primary ml-1" disabled={!!deletingId}>
												{#if deletingId === event.id}
													<span class="loading loading-spinner loading-md"></span> Deleting...
												{:else}
													Delete Event
												{/if}
											</button>
										</div>
									</form>
								</div>
							</div>
						</dialog>

						<button
							class="btn btn-primary"
							onclick={() => goToEdit(event.id)}
							disabled={!!deletingId}>Edit Event</button
						>
					</div>
				</div>
			</div>
		{/each}
	{/await}
</div>

<a class="btn btn-primary mt-6" href="/add" role="button">Add Event</a>

<style>
</style>

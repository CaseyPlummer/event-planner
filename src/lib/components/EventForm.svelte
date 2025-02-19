<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { Event } from '../server/remote-events';
	import Spinner from './Spinner.svelte';

	interface Props {
		form?: { error: string };
		event?: Event;
	}
	let { form, event }: Props = $props();
	let saving = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		saving = true;

		return async ({ update }) => {
			await update();
			saving = false;
		};
	}}
>
	<div class="space-y-12">
		<div class="border-b pb-12">
			<h2 class="font-semibold">{event ? 'Edit' : 'Add'} Event</h2>

			<div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
				<div class="sm:col-span-4">
					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Title</span>
						</div>
						<input
							type="text"
							id="title"
							name="title"
							class="input input-bordered w-full max-w-xs"
							placeholder="Title"
							required
							disabled={saving}
							value={event?.title}
						/>
						<div class="label">
							<!-- <span class="label-text-alt">Required</span> -->
						</div>
					</label>

					<label class="form-control">
						<div class="label">
							<span class="label-text">Description</span>
						</div>

						<textarea
							id="description"
							name="description"
							class="textarea textarea-bordered h-24"
							rows="4"
							cols="50"
							placeholder="Description"
							disabled={saving}
							value={event?.description}
						></textarea>
						<div class="label">
							<!-- <span class="label-text-alt">Required</span> -->
						</div>
					</label>

					<label class="form-control w-full max-w-xs">
						<div class="label">
							<span class="label-text">Date</span>
						</div>
						<input
							type="datetime-local"
							id="date"
							name="date"
							class="input input-bordered w-full max-w-xs"
							placeholder="Date"
							required
							disabled={saving}
							value={event?.date}
						/>
						<div class="label">
							<!-- <span class="label-text-alt">Required</span> -->
						</div>
					</label>
				</div>
			</div>
		</div>
	</div>

	<div class="mt-6 flex items-center justify-end gap-x-6">
		<button type="button" class="btn btn-neutral" onclick={() => goto('/')}>Cancel</button>

		<button type="submit" class="btn btn-primary" disabled={saving}>
			{#if saving}
				<Spinner /> Saving...
			{:else}
				{event ? 'Update' : 'Create'} Event
			{/if}
		</button>
	</div>

	{#if form?.error}
		<div role="alert" class="alert mt-6 text-red-400">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>{form?.error}</span>
		</div>
	{/if}
</form>

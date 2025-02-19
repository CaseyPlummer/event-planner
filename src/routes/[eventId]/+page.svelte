<script lang="ts">
	import { formatDate } from '$lib/dates';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div>
	{#await data.streamed.event}
		<p>Loading...</p>
	{:then event}
		{#if event}
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
				</div>
			</div>
		{/if}
	{/await}
</div>

<script lang="ts">
    import EventForm from '$lib/components/EventForm.svelte';
    import type { ActionData } from './$types';
    export let form: ActionData & { error?: string; };
</script>

<EventForm {form} />
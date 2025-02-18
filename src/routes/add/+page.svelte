<script lang="ts">
    import EventForm from '$lib/components/EventForm.svelte';
    import type { ActionData } from './$types';
    export let form: ActionData;
</script>

<EventForm {form} />
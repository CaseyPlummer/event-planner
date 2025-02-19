<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="app">
	<!-- <Header /> -->

	<div class="app-columns">
		<main class="">
			{@render children?.()}
		</main>

		<div class="sidebar-menu">
			<!-- <Menu /> -->
		</div>

		<div class="sidebar-lists">
			<!-- <Lists /> -->
		</div>
	</div>

	<!-- <Footer /> -->
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.app-columns {
		display: flex;
		flex-direction: row;
		flex: 1;
		z-index: 1;
		overflow: auto;
	}

	main {
		overflow: auto;
		padding: 2rem;
	}

	.sidebar-menu {
		order: -1; // Main content appears first in html
		z-index: 2;
		display: none; // Not using yet
	}

	.sidebar-lists {
		order: -1; // Main content appears first in html
		z-index: 1;
		display: none; // Not using yet
	}
</style>

<template>
	<accordion v-model="active_panel" :collapsible="false">
		<accordion-panel id="events">
			<accordion-panel-header>Events</accordion-panel-header>
			<accordion-panel-content>event event event</accordion-panel-content>
		</accordion-panel>

		<accordion-panel id="results">
			<accordion-panel-header>
				<span>Results</span>
				<span>&gt;</span>
			</accordion-panel-header>
			<accordion-panel-content>Baz baz baz</accordion-panel-content>
		</accordion-panel>
	</accordion>
</template>

<script>
import { ref } from 'vue';
export default {
	name: 'App',

	setup() {
		const active_panel = ref([1]);

		return {
			active_panel,
		};
	},
};
</script>

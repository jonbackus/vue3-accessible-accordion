<template>
	<accordion v-model="active_panel" :collapsible="false" :expandable="true">
		<accordion-panel id="events">
			<accordion-panel-header data-foo="bar" v-bind:is_active="{is_active}">Events {{is_active}}</accordion-panel-header>
			<accordion-panel-content>event event event</accordion-panel-content>
		</accordion-panel>

		<accordion-panel id="results">
			<accordion-panel-header>
				<span>Results</span>
				<span>&gt;</span>
			</accordion-panel-header>
			<accordion-panel-content>
				<div>Baz baz baz</div>

				<a href="#">Link</a><br />

				<input type="text" placeholder="First name" />
			</accordion-panel-content>
		</accordion-panel>
	</accordion>
</template>

<script>
import { ref } from 'vue';
export default {
	name: 'App',

	setup() {
		const active_panel = ref([0]);

		return {
			active_panel,
		};
	},
};
</script>

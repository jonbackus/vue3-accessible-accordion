import { defineComponent, h, inject, ref } from 'vue';

export default defineComponent({
	name: 'accordion-panel-content',

	props: {
		index: { type: Number, required: true },
		panel_id: { type: String, required: true },
	},

	setup(props, { slots }) {
		const active_indexes = inject('active_indexes', ref(0));

		return () =>
			h(
				'div',
				{
					class: 'accordion__panel-content',
					hidden: !active_indexes.value.includes(props.index),
					role: 'region',
					'aria-labelledby': `${props.panel_id}-toggle`,
					id: `${props.panel_id}-content`,
				},
				slots.default ? slots.default() : [],
			);
	},
});

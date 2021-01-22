import { defineComponent, h, inject, onMounted, ref, watch } from 'vue';
import { focusable_elements } from '@/utils';

export default defineComponent({
	name: 'accordion-panel-content',

	props: {
		index: { type: Number, required: true },
		panel_id: { type: String, required: true },
	},

	setup(props, { slots, attrs }) {
		const active_indexes = inject('active_indexes', ref(0));
		const panel_ref = ref();

		const set_negative_tabindex_on_focusable_children = () => {
			const focusable_elements_in_panel = panel_ref.value.querySelectorAll(focusable_elements);

			Array.from(focusable_elements_in_panel).forEach(el => el.setAttribute('tabindex', '-1'));
		};

		const restore_tabindex_on_focusable_children = () => {
			const previously_focusable_elements_in_panel = panel_ref.value.querySelectorAll('[tabindex="-1"]');

			Array.from(previously_focusable_elements_in_panel).forEach(el => el.setAttribute('tabindex', '0'));
		};

		onMounted(() => {
			if (!active_indexes.value.includes(props.index) && panel_ref.value) {
				set_negative_tabindex_on_focusable_children();
			}
		});

		watch(
			() => active_indexes.value,
			(newval, oldval) => {
				if (newval.includes(props.index)) {
					restore_tabindex_on_focusable_children();
				} else if (oldval.includes(props.index)) {
					set_negative_tabindex_on_focusable_children();
				}
			},
		);

		return () =>
			h(
				'div',
				{
					...attrs,
					class: ['accordion__panel-content', attrs.class || ''].join(' ').trim(),
					hidden: !active_indexes.value.includes(props.index),
					role: 'region',
					'aria-labelledby': `${props.panel_id}-toggle`,
					id: `${props.panel_id}-content`,
					ref: panel_ref,
				},
				slots.default ? slots.default() : [],
			);
	},
});

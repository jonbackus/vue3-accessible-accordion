import { defineComponent, h, provide, ref, watch, inject } from 'vue';

export default defineComponent({
	props: {
		modelValue: { type: Array, required: false, default: () => [] },
		headerTag: { type: String, required: false, default: 'h3' },
		collapsible: { type: Boolean, required: false, default: true },
		expandable: { type: Boolean, required: false, default: false },
	},

	setup(props, { emit, slots }) {
		provide('active_indexes', ref(props.modelValue.slice() || []));
		provide('header_tag', props.headerTag);
		provide('collapsible', props.collapsible);
		provide('expandable', props.expandable);

		const active_indexes = inject('active_indexes', ref(props.modelValue.slice() || []));

		watch(
			() => active_indexes.value,
			(newval, oldval) => {
				if (newval && newval.join('') !== oldval.join('') && newval.join('') !== props.modelValue.join('')) {
					emit('update:modelValue', newval.slice());
				}
			},
		);

		watch(
			() => props.modelValue,
			(newval, oldval) => {
				if (
					newval &&
					oldval &&
					newval.join('') !== oldval.join('') &&
					newval.join('') !== active_indexes.value.join('')
				) {
					active_indexes.value = newval;
				}
			},
			{
				immediate: true,
			},
		);

		const get_accordion_groups = () => {
			let default_slot = slots.default ? slots.default() : [];

			let accordion_groups = [];

			default_slot
				.filter(
					node =>
						node.type.name === 'accordion-panel' ||
						(typeof node.type === 'symbol' && node.type.description === 'Fragment'),
				)
				.forEach(node => {
					if (typeof node.type === 'symbol' && node.type.description === 'Fragment') {
						accordion_groups = accordion_groups.concat(
							node.children.filter(vnode => vnode.type.name === 'accordion-panel'),
						);
					} else {
						accordion_groups.push(node);
					}
				});

			return accordion_groups;
		};

		return () => {
			let accordion_groups = get_accordion_groups();

			return h(
				'div',
				{
					class: 'accordion',
				},
				accordion_groups.map((child, child_index) =>
					h(child, { index: child_index, 'data-index': child_index }),
				),
			);
		};
	},
});

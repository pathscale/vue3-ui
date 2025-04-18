<template>
	<transition :enter-active-class="transition.enter" :leave-active-class="transition.leave">
		<div ref="root" v-show="state.isActive" :class="['notification mb-5', type, `v-toast--${position}`]"
			@mouseover="toggleTimer(true)" @mouseleave="toggleTimer(false)" @click="click" role="alert">
			<button v-if="dismissible" class="delete" />
			<div v-html="message" />
		</div>
	</transition>
</template>

<script>
// Credits: @MeForma/vue-toaster
import {
	computed,
	onBeforeMount,
	onBeforeUnmount,
	onMounted,
	reactive,
	ref,
} from "vue";
import Positions, { definePosition } from "./defaults/positions";
import eventBus from "./helpers/event-bus";
import { removeElement } from "./helpers/remove-element";
import Timer from "./helpers/timer";

export default {
	name: "Toast",
	props: {
		message: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			default: "is-primary",
		},
		position: {
			type: String,
			default: Positions.BOTTOM_RIGHT,
			validator(value) {
				return Object.values(Positions).includes(value);
			},
		},
		maxToasts: {
			type: [Number, Boolean, String],
			default: false,
		},
		duration: {
			type: [Number, Boolean, String],
			default: 4000,
		},
		dismissible: {
			type: Boolean,
			default: true,
		},
		queue: {
			type: Boolean,
		},
		pauseOnHover: {
			type: Boolean,
		},
		onClose: {
			type: Function,
			// eslint-disable-next-line no-empty-function -- ignore
			default() {},
		},
		onClick: {
			type: Function,
			// eslint-disable-next-line no-empty-function -- ignore
			default() {},
		},
	},
	setup(props) {
		const root = ref(null);

		const state = reactive({
			isActive: false,
			parentTop: null,
			parentBottom: null,
			isHovered: false,
			timer: null,
		});

		let queueTimer = null;

		const correctParent = computed(() => {
			return definePosition(
				props.position,
				state.parentTop,
				state.parentBottom,
			);
		});

		const transition = computed(() => {
			return definePosition(
				props.position,
				{
					enter: "fadeInDown",
					leave: "fadeOut",
				},
				{
					enter: "fadeInUp",
					leave: "fadeOut",
				},
			);
		});

		function createParents() {
			state.parentTop = document.querySelector(".v-toast-container--top");
			state.parentBottom = document.querySelector(".v-toast-container--bottom");

			if (state.parentTop && state.parentBottom) return;

			if (!state.parentTop) {
				state.parentTop = document.createElement("div");
				state.parentTop.className = "v-toast-container v-toast-container--top";
			}

			if (!state.parentBottom) {
				state.parentBottom = document.createElement("div");
				state.parentBottom.className =
					"v-toast-container v-toast-container--bottom";
			}
		}

		function setupContainer() {
			const container = document.body;
			container.append(state.parentTop);
			container.append(state.parentBottom);
		}

		function shouldQueue() {
			if (!props.queue && props.maxToasts === false) {
				return false;
			}

			if (props.maxToasts !== false) {
				return (
					props.maxToasts <=
					state.parentTop.childElementCount +
						state.parentBottom.childElementCount
				);
			}

			return (
				state.parentTop.childElementCount > 0 ||
				state.parentBottom.childElementCount > 0
			);
		}

		function showNotice() {
			if (shouldQueue()) {
				queueTimer = setTimeout(showNotice, 250);
				return;
			}

			correctParent.value.insertAdjacentElement("afterbegin", root.value);
			state.isActive = true;

			state.timer =
				props.duration !== false ? new Timer(close, props.duration) : null;
		}

		function click() {
			// biome-ignore lint/style/noArguments: <explanation>
			Reflect.apply(props.onClick, null, arguments);

			if (props.dismissible) {
				close();
			}
		}

		function toggleTimer(newVal) {
			if (state.timer && props.pauseOnHover) {
				newVal ? state.timer.pause() : state.timer.resume();
			}
		}

		function stopTimer() {
			state.timer?.stop();
			clearTimeout(queueTimer);
		}

		function close() {
			stopTimer();
			state.isActive = false;
			setTimeout(() => {
				// biome-ignore lint/style/noArguments: <explanation>
				Reflect.apply(props.onClose, null, arguments);
				removeElement(root.value);
			}, 150);
		}

		onBeforeMount(() => {
			createParents();
			setupContainer();
		});

		onMounted(() => {
			showNotice();
			eventBus.$on("toast-clear", close);
		});

		onBeforeUnmount(() => {
			eventBus.$off("toast-clear", close);
		});

		return { state, transition, toggleTimer, click, root };
	},
};
</script>

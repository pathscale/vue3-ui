<template>
	<transition :enter-active-class="transition.enter" :leave-active-class="transition.leave">
		<div ref="root" v-show="state.isActive" :class="['notification mb-5', type, `v-toast--${position}`]"
			@mouseover="toggleTimer(true)" @mouseleave="toggleTimer(false)" @click="click" role="alert">
			<button v-if="dismissible" class="delete" />
			<div v-html="message" />
		</div>
	</transition>
</template>

<script setup lang="ts">
// Credits: @MeForma/vue-toaster
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  useTemplateRef,
} from "vue";
import Position, { definePosition } from "./defaults/position";
import eventBus from "./helpers/event-bus";
import { removeElement } from "./helpers/remove-element";
import Timer from "./helpers/timer";

const props = withDefaults(
  defineProps<{
    message: string; // required
    type?: string;
    position?: Position;
    maxToasts?: number | false;
    duration?: number | false;
    dismissible?: boolean;
    queue?: boolean;
    pauseOnHover?: boolean;
    onClose?: () => void;
    onClick?: () => void;
  }>(),
  {
    type: "is-primary",
    position: Position.BOTTOM_RIGHT,
    maxToasts: false,
    duration: 4000,
    dismissible: true,
    onClose: () => {},
    onClick: () => {},
  },
);

const root = useTemplateRef("root");

const state = reactive<{
  isActive: boolean;
  parentTop: HTMLElement | null;
  parentBottom: HTMLElement | null;
  isHovered: boolean;
  timer: Timer | null;
}>({
  isActive: false,
  parentTop: null,
  parentBottom: null,
  isHovered: false,
  timer: null,
});

let queueTimer: number | undefined = undefined;

const correctParent = computed(() => {
  return definePosition(props.position, state.parentTop, state.parentBottom);
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
    const parentTop = document.createElement("div");
    parentTop.className = "v-toast-container v-toast-container--top";
    state.parentTop = parentTop;
  }

  if (!state.parentBottom) {
    const parentBottom = document.createElement("div");
    parentBottom.className = "v-toast-container v-toast-container--bottom";
    state.parentBottom = parentBottom;
  }
}

function setupContainer() {
  const container = document.body;
  container.append(state.parentTop as HTMLElement);
  container.append(state.parentBottom as HTMLElement);
}

function shouldQueue() {
  if (!props.queue && props.maxToasts === false) {
    return false;
  }

  const topCount = (state.parentTop as HTMLElement).childElementCount;
  const botCount = (state.parentBottom as HTMLElement).childElementCount;

  if (props.maxToasts !== false) {
    return props.maxToasts <= topCount + botCount;
  }

  return topCount > 0 || botCount > 0;
}

function showNotice() {
  if (shouldQueue()) {
    queueTimer = window.setTimeout(showNotice, 250);
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

function toggleTimer(newVal: boolean) {
  if (state.timer && props.pauseOnHover) {
    newVal ? state.timer.pause() : state.timer.resume();
  }
}

function stopTimer() {
  state.timer?.stop();
  window.clearTimeout(queueTimer);
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
</script>

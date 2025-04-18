<script setup lang="ts">
import {
  defineEmits,
  defineModel,
  onBeforeUnmount,
  onMounted,
  reactive,
  useTemplateRef,
} from "vue";

import VField from "../Field/Field.vue";
import VInput from "../Input/Input.vue";

const props = withDefaults(
  defineProps<{
    items?: Array<string | number>;
    label?: string;
  }>(),
  {
    items: () => [],
  },
);

const search = defineModel<string | number>();

const state = reactive({
  isOpen: false,
  results: props.items,
  search: "",
  arrowCounter: 0,
});

const filterResults = () => {
  // first uncapitalize all the things
  const filter = (search.value ?? "").toString().toLowerCase();
  state.results = props.items.filter((item) => {
    return item.toString().toLowerCase().includes(filter);
  });
};

const onChange = () => {
  filterResults();
  state.isOpen = true;
};

const setResult = (result) => {
  search.value = result;
  state.isOpen = false;
};

const onArrowDown = (evt) => {
  if (state.arrowCounter < state.results.length) {
    state.arrowCounter += 1;
  }
};

const onArrowUp = () => {
  if (state.arrowCounter > 0) {
    state.arrowCounter -= 1;
  }
};

const onEnter = () => {
  search.value = state.results[state.arrowCounter];
  state.isOpen = false;
  state.arrowCounter = -1;
};

const handleClickInside = () => {
  state.isOpen = true;
};

const handleClickOutside = () => {
  state.isOpen = false;
  state.arrowCounter = -1;
};

const dropdownWrapper = useTemplateRef<HTMLElement>("dropdown-wrapper");

const detectOutsideClick = (event: MouseEvent) => {
  const wrapperEl = dropdownWrapper.value;
  if (wrapperEl && !wrapperEl.contains(event.target as Node)) {
    // Clicked outside!
    handleClickOutside();
  }
};

onMounted(() => {
  document.addEventListener("click", detectOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", detectOutsideClick);
});
</script>

<template>
  <!-- eslint-disable @pathscale/vue3/v-directive -->
  <div>
    <div ref="dropdown-wrapper" class="dropdown" :class="{ 'is-active': state.isOpen }">
      <div class="dropdown-trigger">
        <v-field :label="label">
          <v-input
            @focus="handleClickInside"
            type="text"
            @input="onChange"
            v-model="search"
            @keyup.down.stop="onArrowDown"
            @keyup.up.stop="onArrowUp"
            @keyup.enter.stop="onEnter" />
        </v-field>
      </div>
      <div class="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <div v-if="state.results.length === 0" class="dropdown-item">
            No data available
          </div>
          <a
            v-for="(result, i) in state.results"
            :key="i"
            @click="setResult(result)"
            class="dropdown-item"
            :class="{ 'is-active': i === state.arrowCounter }">
            {{ result }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>



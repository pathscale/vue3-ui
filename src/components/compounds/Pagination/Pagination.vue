<script setup lang="ts">
import { intOrParseInt } from "@/utils/functions";
import { computed, nextTick, watchEffect } from "vue";
import PaginationItem from "./PaginationItem.vue";

const props = withDefaults(
  defineProps<{
    total?: number | string;
    perPage?: number | string;
    current?: number | string;
    rangeBefore?: number | string;
    rangeAfter?: number | string;
    size?: string;
    simple?: boolean;
    rounded?: boolean;
    order?: string;
    ariaNextLabel?: string;
    ariaPreviousLabel?: string;
    ariaPageLabel?: string;
    ariaCurrentLabel?: string;
  }>(),
  {
    perPage: 20,
    current: 1, // TODO: update documentation to mention the default value
    rangeBefore: 1,
    rangeAfter: 1,
  },
);

const emit = defineEmits(["update:current", "change"]);

const beforeCurrent = computed(() => {
  return intOrParseInt(props.rangeBefore);
});
const afterCurrent = computed(() => {
  return intOrParseInt(props.rangeAfter);
});

const pageCount = computed(() => {
  return Math.ceil(props.total / props.perPage);
});

const firstItem = computed(() => {
  const _firstItem = props.current * props.perPage - props.perPage + 1;
  return _firstItem >= 0 ? _firstItem : 0;
});

const hasPrev = computed(() => {
  return props.current > 1;
});

const hasFirst = computed(() => {
  return props.current >= 2 + beforeCurrent.value;
});

const hasFirstEllipsis = computed(() => {
  return props.current >= beforeCurrent.value + 4;
});

const hasLast = computed(() => {
  return props.current <= pageCount.value - (1 + afterCurrent.value);
});

const hasLastEllipsis = computed(() => {
  return props.current < pageCount.value - (2 + afterCurrent.value);
});

const hasNext = computed(() => {
  return props.current < pageCount.value;
});

const pagesInRange = computed(() => {
  if (props.simple) return null;
  let left = Math.max(1, props.current - beforeCurrent.value);
  if (left - 1 === 2) {
    left--;
  }

  let right = Math.min(props.current + afterCurrent.value, pageCount.value);
  if (pageCount.value - right === 2) {
    right++;
  }
  const pages = [];

  for (let i = left; i <= right; i++) {
    pages.push(getPage(i));
  }

  return pages;
});

watchEffect(() => {
  if (props.current > pageCount.value) last();
});

function changePage(num: number, e: Event) {
  if (props.current === num || num < 1 || num > pageCount.value) return;
  emit("update:current", num);
  emit("change", num);
  if (e?.target) {
    nextTick(() => e.target.focus());
  }
}

function last(e) {
  changePage(pageCount.value, e);
}
function getPage(
  num: number,
  options: {
    disabled?: boolean;
    class?: string;
    "aria-label"?: string;
  } = {},
) {
  return {
    number: num,
    isCurrent: props.current === num,
    click: (e) => changePage(num, e),
    disabled: options.disabled || false,
    class: options.class || "",
    "aria-label":
      options["aria-label"] || getAriaPageLabel(num, props.current === num),
  };
}

function getAriaPageLabel(pageNumber, isCurrent) {
  if (props.ariaPageLabel && (!isCurrent || !props.ariaCurrentLabel)) {
    return `${props.ariaPageLabel} ${pageNumber}.`;
  }
  if (props.ariaPageLabel && isCurrent && props.ariaCurrentLabel) {
    return `${props.ariaCurrentLabel}, ${props.ariaPageLabel} ${pageNumber}.`;
  }
  return null;
}
</script>

<template>
	<nav class="pagination" :class="[
		order,
		size,
		{
			'is-simple': simple,
			'is-rounded': rounded,
		},
	]">
		<slot v-if="$slots.previous" name="previous" :page="getPage(current - 1, {
			disabled: !hasPrev,
			class: 'pagination-previous',
			'aria-label': ariaPreviousLabel,
		})
			">
			&laquo;
		</slot>
		<pagination-item v-else class="pagination-previous" :disabled="!hasPrev" :page="getPage(current - 1)"
			:aria-label="ariaPreviousLabel">
			&laquo;
		</pagination-item>
		<slot v-if="$slots.next" name="next" :page="getPage(current + 1, {
			disabled: !hasNext,
			class: 'pagination-next',
			'aria-label': ariaNextLabel,
		})
			">
			&raquo;
		</slot>
		<pagination-item v-else class="pagination-next" :disabled="!hasNext" :page="getPage(current + 1)"
			:aria-label="ariaNextLabel">
			&raquo;
		</pagination-item>

		<small class="info" v-if="simple">
			<template v-if="perPage == 1"> {{ firstItem }} / {{ total }} </template>
			<template v-else>
				{{ firstItem }}-{{ Math.min(current * perPage, total) }} / {{ total }}
			</template>
		</small>
		<ul class="pagination-list" v-else>
			<li v-if="hasFirst">
				<slot v-if="$slots.default" :page="getPage(1)" />
				<pagination-item v-else :page="getPage(1)" />
			</li>
			<li v-if="hasFirstEllipsis">
				<span class="pagination-ellipsis">&hellip;</span>
			</li>

			<li v-for="page in pagesInRange" :key="page.number">
				<slot v-if="$slots.default" :page="page" />
				<pagination-item v-else :page="page" />
			</li>

			<li v-if="hasLastEllipsis">
				<span class="pagination-ellipsis">&hellip;</span>
			</li>
			<li v-if="hasLast">
				<slot v-if="$slots.default" :page="getPage(pageCount)" />
				<pagination-item v-else :page="getPage(pageCount)" />
			</li>
		</ul>
	</nav>
</template>

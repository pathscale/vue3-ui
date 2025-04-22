<template>
  <input ref="input" :type="type" />
</template>

<script setup lang="ts">
import { firstIfArray } from "@/utils/functions";
import { inject, onMounted, ref, useTemplateRef } from "vue";
import type bulmaCalendarType from "./bulma-calendar";

type BulmaCalendar = typeof bulmaCalendarType;

const props = withDefaults(
  defineProps<{
    clearable?: boolean;
    dialog?: boolean;
    inline?: boolean;
    range?: boolean;
    options?: bulmaCalendarType.Options;
    type?: "date" | "time" | "datetime";
    modelValue?: Date | [Date, Date];
  }>(),
  {
    options: () => ({}),
    type: "datetime",
  },
);

const emit = defineEmits(["update:modelValue", "select"]);

type DateRange = [Date | undefined, Date | undefined];

const date = ref<DateRange>([undefined, undefined]);
const input = useTemplateRef<HTMLInputElement>("input");

onMounted(() => {
  const bulmaCalendar = inject<BulmaCalendar>("$bulmaCalendar");
  if (!bulmaCalendar) {
    throw new Error(
      "BulmaCalendar component requires the bulmaCalendar service to be provided",
    );
  }
  // Set date
  if (props.range) {
    if (Array.isArray(props.modelValue)) {
      date.value = props.modelValue;
    }
  } else {
    date.value[0] = firstIfArray(props.modelValue);
  }

  if (!input.value) {
    throw new Error("no template ref for calendar");
  }

  const calendar = bulmaCalendar.attach(input.value, {
    ...props.options,
    displayMode: props.inline ? "inline" : props.dialog ? "dialog" : "default",
    isRange: props.range,
    showClearButton: props.clearable,
    startDate: date.value[0],
    startTime: date.value[0],
    endDate: date.value[1],
    endTime: date.value[1],
  });

  calendar[0].on("save", (e) => {
    date.value = [e.data.startDate, e.data.endDate];

    if (props.range) {
      emit("update:modelValue", date.value);
      return;
    }

    emit("update:modelValue", date.value[0]);
  });

  calendar[0].on("select", (e) => {
    if (props.range) {
      emit("select", [e.data.startDate, e.data.endDate]);
      return;
    }

    emit("select", e.data.startDate);
  });
});
</script>

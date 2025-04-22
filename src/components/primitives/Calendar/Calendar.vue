<template>
  <input ref="input" :type="type" />
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    clearable?: boolean;
    dialog?: boolean;
    inline?: boolean;
    range?: boolean;
    options?: object; // todo typed
    type?: "date" | "time" | "datetime";
    modelValue?: Date | Date[];
  }>(),
  {
    options: () => ({}),
    type: "datetime",
  },
);

const emit = defineEmits(["update:modelValue", "select"]);

const date = ref([null, null]);
const input = ref(null);

onMounted(() => {
  const bulmaCalendar = inject("$bulmaCalendar");
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
    date.value[0] = props.modelValue;
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

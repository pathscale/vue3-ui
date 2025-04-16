<template>
  <div ref="chartRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, withDefaults, defineProps, useAttrs } from 'vue'
// @ts-ignore
import { Chart } from '@pathscale/frappe-charts'

interface IProps {
  title: string
  type: string
  height?: number | null
  width?: number | null
  isNavigable?: number
  xUnit?: number
  data: Record<string, unknown>
  options?: Record<string, unknown>
  colors?: string[]
  animate?: boolean
  truncateLegends?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  height: null,
  width: null,
  isNavigable: 0,
  xUnit: 1,
  options: () => ({}),
  colors: () => [],
  animate: false,
  truncateLegends: false,
})

const attrs = useAttrs()

const chartRef = ref(null)
const chartJSState: {
  chart: Record<string, unknown> | null
  props: IProps
} = {
  chart: null,
  props: {
    ...props,
  },
}

const render = () => {
  chartJSState.chart = new Chart(chartRef.value, {
    ...props,
    ...attrs,
  })
}

watch(
  () => [props.width],
  () => {
    // @ts-ignore
    chartJSState.chart?.update({
      ...props.data,
    })
  },
  {
    flush: 'post',
  },
)

onMounted(() => render())
</script>

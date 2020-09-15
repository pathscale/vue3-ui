<script>
import { computed, ref, watchEffect } from 'vue'

const Tab = {
  name: 'VTable',
  props: {
    data: {
      type: Object,
      default: {}
    },
    columns: {
      type: Object,
      default: {}
    }
  },
  setup(props, { emit }) {
    return { props }
  },
}

export default Tab;
</script>

<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th v-for="column in props.columns" :key="column.field">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.id">
          <td v-for="column in row" :key="column">{{ column }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

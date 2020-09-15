<script>
import { computed, reactive, watchEffect } from 'vue'

const Table = {
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
    const data = reactive(props.data)
    const sortColumn = (field) => {
      data.sort((a, b) => {
        console.log(a[field], b[field])
        if(a[field] < b[field]) { return -1 };
        if(a[field] > b[field]) { return 1 };
        return 0;
      })
    }
    return { props, data, sortColumn }
  },
}

export default Table;
</script>

<template>
  <div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th v-for="column in props.columns" :key="column.field" @click="sortColumn(column.field)">{{ column.label }}</th>
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

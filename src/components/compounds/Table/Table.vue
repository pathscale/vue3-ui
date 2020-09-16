<script>
import { computed, reactive, ref, watchEffect } from 'vue'

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
    const columns = reactive(props.columns)
    columns.forEach(col => {
      col.ascendant = true
    });
    const sortColumn = (col) => {
      data.sort((a, b) => {
        if(a[col.field] < b[col.field]) { return col.ascendant ? -1 : 1 };
        if(a[col.field] > b[col.field]) { return col.ascendant ? 1 : -1 };
        return 0;
      })
      col.ascendant = !col.ascendant
    }
    return { columns, data, sortColumn }
  },
}

export default Table;
</script>

<template>
  <div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.field" @click="sortColumn(column)">{{ column.label }} {{ column.ascendant ? "&darr;" : "	&uarr;" }}</th>
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

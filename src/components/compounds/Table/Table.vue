<script>
import { computed, reactive, ref, watchEffect } from 'vue'
import { VInput } from '../../'

const Table = {
  name: 'VTable',
  components: { VInput },
  props: {
    data: {
      type: Object,
      default: {}
    },
    columns: {
      type: Object,
      default: {}
    },
    searchable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const data = ref(props.data)
    const search = reactive({})
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

    const handleSearch = (field) => {
      data.value = props.data.filter((row) => {
        return row[field].toString().toLowerCase().includes(search[field].toLowerCase())
      })
    }

    return { props, columns, data, sortColumn, search, handleSearch }
  },
}

export default Table;
</script>

<template>
  <div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.field"
            @click="sortColumn(column)">
            {{ column.label }} {{ column.ascendant ? "&darr;" : "	&uarr;" }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="props.searchable">
          <td v-for="column in columns" :key="column.field">
            <input
              name="search"
              type="text"
              v-model="search[column.field]"
              @input="handleSearch(column.field)"
              color="is-dark"
              placeholder="Search"
              class="input has-text-black is-small is-black" />
          </td>
        </tr>
        <tr v-for="row in data" :key="row.id">
          <td v-for="column in row" :key="column">{{ column }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

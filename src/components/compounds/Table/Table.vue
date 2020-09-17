<script>
import { clear } from 'console'
import { computed, reactive, ref, watchEffect } from 'vue'
import { VInput, VButton, VCheckbox } from '../../'

const Table = {
  name: 'VTable',
  components: { VInput, VButton, VCheckbox },
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
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const data = ref(props.data)
    const columns = reactive(props.columns)

    const search = reactive({})
    const selected = reactive([])
    const checkedBoxes = reactive([])

    columns.forEach(col => {
      col.ascendant = true
    });

    if(props.checkable) {
      let iterator = 0
      data.value.forEach(row => {
        checkedBoxes[iterator++] = 0
      })
    }

    const sortColumn = (col) => {
      data.value.sort((a, b) => {
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

    const resetData = () => {
      for(const field in search) {
        search[field] = ""
      }
      data.value = props.data
    }

    const handleCheckbox = (row) => {
      const index = selected.indexOf(row)
      if(index > -1) {
        selected.splice(index, 1)
        checkedBoxes[data.value.indexOf(row)] = 0
      } else {
        selected.push(row)
        checkedBoxes[data.value.indexOf(row)] = 1
      }
      emit('checked-rows', selected)
    }

    return { props, columns, data, sortColumn, search, handleSearch, resetData, handleCheckbox, checkedBoxes }
  },
}

export default Table;
</script>

<template>
  <div>
    <table class="table is-striped is-fullwidth">
      <caption>
        <v-button @click="resetData">Reset filters</v-button>
      </caption>
      <thead>
        <tr>
          <th v-if="props.checkable"></th>
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
          <th v-if="props.checkable"></th>
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
          <td v-if="props.checkable">
            <v-checkbox v-model="checkedBoxes[data.indexOf(row)]" @input="handleCheckbox(row)" />
          </td>
          <td v-for="column in row" :key="column">{{ column }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

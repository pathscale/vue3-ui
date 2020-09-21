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
    },
    pagination: {
      type: Boolean,
      default: false
    },
    rowsPerPage: {
      type: Number,
      default: 5
    },
    isBordered: {
      type: Boolean,
      default: false
    },
    isStriped: {
      type: Boolean,
      default: false
    },
    isNarrow: {
      type: Boolean,
      default: false
    },
    isHoverable: {
      type: Boolean,
      default: false
    },
    isFullwidth: {
      type: Boolean,
      default: false
    },
  },
  setup(props, { emit }) {
    const data = ref(props.data)
    const columns = reactive(props.columns)

    const search = reactive({})
    const selected = reactive([])
    const checkedBoxes = reactive([])
    const currentPage = ref(0)

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

    const switchPage = (page) => {
      currentPage.value = page
    }

    const rootClasses = computed(() => {
      return [{
        'is-bordered': props.isBordered,
        'is-striped': props.isStriped,
        'is-narrow': props.isNarrow,
        'is-hoverable': props.isHoverable,
        'is-fullwidth': props.isFullwidth
      }]
    })

    return { props, columns, data, sortColumn, search, handleSearch, resetData, handleCheckbox, checkedBoxes, currentPage, switchPage, rootClasses }
  },
}

export default Table;
</script>

<template>
  <div class="data-grid">
    <div class="tableHeader">
      <v-button @click="resetData" type="is-light has-text-black" class="mt-2 ml-2">&#x21bb;</v-button>
    </div>
    <table class="table" :class="rootClasses">
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
        <tr 
          v-for="row in data.slice(currentPage * +props.rowsPerPage, +props.rowsPerPage * currentPage + +props.rowsPerPage)"
          :key="row.id"
          :class="checkedBoxes[data.indexOf(row)] ? 'is-selected' : ''">
          <td v-if="props.checkable">
            <v-checkbox v-model="checkedBoxes[data.indexOf(row)]" @input="handleCheckbox(row)" />
          </td>
          <td v-for="(column, field) in row" :key="column">
            <slot :name="field" v-bind:row="row">
              {{ column }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="tableFooter mb-4">
      <nav class="pagination" role="navigation" aria-label="pagination" v-if="props.pagination">
        <ul class="pagination-list">
          <v-button
            class="is-light has-text-black ml-1 mr-1"
            v-for="n in Math.floor(data.length / props.rowsPerPage)"
            @click="switchPage(n-1)"
            :key="n">
            {{ n }}
          </v-button>
          <v-button
            v-if="data.length % props.rowsPerPage"
            @click="switchPage(Math.floor(data.length / props.rowsPerPage))"
            class="is-light has-text-black ml-1 mr-1">
            {{ Math.floor(data.length / props.rowsPerPage) + 1 }}
          </v-button>
        </ul>
      </nav>
    </div>
  </div>
</template>

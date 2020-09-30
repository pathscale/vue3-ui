<script>
import { computed, reactive, ref, watch } from 'vue'
import { VInput, VButton, VCheckbox, VSelect } from '../..'
import VTag from '../Tag/Tag'

const Table = {
  name: 'VTable',
  components: { VInput, VButton, VCheckbox, VSelect, VTag },
  props: {
    data: {
      type: Object,
      default: {},
    },
    searchable: Boolean,
    checkable: Boolean,
    pagination: Boolean,
    rowsPerPage: {
      type: Number,
      default: 5,
    },
    rowsPerPageOptions: {
      type: Array,
      default: [],
    },
    isBordered: Boolean,
    isStriped: Boolean,
    isNarrow: Boolean,
    isHoverable: Boolean,
    isFullwidth: Boolean,
    hasResetBtn: Boolean,
    sortable: Boolean,
    expandable: Boolean
  },

  setup(props, { emit }) {
    // general state
    const data = ref(props.data)
    const columnProperties = ref(props.data.columns)

    // pagination state
    const pagination = ref(props.pagination)
    const rowsPerPage = ref(props.rowsPerPage)
    const currentPage = ref(0)

    for (const colName in props.data.columns) {
      columnProperties.value[colName].ascendant = true
    }

    const search = reactive({})

    const expanded = ref(new Set())

    // whenever pagination props changes, update the class state accordingly
    // thsi way pagination settings are directly passed to props and indirectly passed to class

    // page goes back to first when rowperpage changes
    watch(rowsPerPage, () => {
      props.data.rowsPerPage = rowsPerPage.value
      currentPage.value = 0
      props.data.switchPage()
    })

    // compute new rows window whenever currentpage changes
    watch(currentPage, () => {
      props.data.currentPage = currentPage.value
      props.data.switchPage()
    })

    // compute rows window on first render as no change cb triggers
    if (props.pagination) {
      props.data.rowsPerPage = rowsPerPage.value
      props.data.switchPage()
    }

    // if(props.checkable) {
    //   let iterator = 0
    //   props.data.rows.forEach(row => {
    //     checkedBoxes[iterator++] = 0
    //   })
    // }

    const sortColumn = colName => {
      props.data.sortByColumn(colName, columnProperties.value[colName].ascendant)
      columnProperties.value[colName].ascendant = !columnProperties.value[colName].ascendant
    }

    const toggleExpanded = rowId => {
      if (expanded.value.has(rowId)) {
        expanded.value.delete(rowId)
        return;
      }
      expanded.value.add(rowId)
    }

    const rootClasses = computed(() => {
      return [
        {
          'is-bordered': props.isBordered,
          'is-striped': props.isStriped,
          'is-narrow': props.isNarrow,
          'is-hoverable': props.isHoverable,
          'is-fullwidth': props.isFullwidth,
        },
      ]
    })

    return {
      props,
      columnProperties,
      data,
      search,
      sortColumn,
      rowsPerPage,
      // checkedBoxes,
      currentPage,
      rootClasses,
      expanded,
      toggleExpanded
    }
  },
}
export default Table
</script>

<template>
  <div class="data-grid">
    <div class="tableHeader">
      <slot name="header">
        <v-button
          @click="props.data.resetFilters()"
          v-if="props.hasResetBtn"
          type="is-light has-text-black"
          class="mt-2 ml-2">
          &#x21bb;
        </v-button>
      </slot>
    </div>
    <table class="table" :class="rootClasses">
      <thead>
        <tr>
          <td v-if="checkable" />
          <td v-if="expandable" />
          <th
            v-for="column in props.data.getColumns()"
            :key="column"
            @click="props.sortable ? sortColumn(column.name) : null">
            {{ column.caption }}
            <span v-if="props.sortable">
              {{ columnProperties[column.name].ascendant ? '&darr;' : '	&uarr;' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="props.searchable">
          <td v-if="checkable" />
          <td v-for="column in props.data.getColumns()" :key="column.name">
            <input
              name="search"
              type="text"
              v-model="search[column.name]"
              @input="props.data.searchColumn(column.name, search[column.name])"
              color="is-dark"
              placeholder="Search"
              class="input has-text-black is-small is-black" />
          </td>
        </tr>
        <template v-for="row in props.data.rows" :key="row.id">
          <tr>
            <td v-if="checkable">
              <v-checkbox @change="props.data.toggleCheck($event, row)" />
            </td>
            <td v-if="expandable">
              <a><v-tag @click="toggleExpanded(row.id)" type="is-primary">{{ expanded.has(row.id) ? '&uarr;' : '&darr;' }}</v-tag></a>
            </td>
            <td v-for="column in props.data.getColumns()" :key="column.name">
              <slot :name="column.name" :row="row">
                {{ row[column.name] }}
              </slot>
            </td>
          </tr>
          <div class="expansion" v-if="expanded.has(row.id)">
            <slot name="expanded" :row="row" />
          </div>
        </template>
      </tbody>
    </table>
    <!-- todo: move the styles to their own scope -->
    <div
      class="pagination-wrapper"
      v-if="pagination"
      style="display: flex; justify-content: flex-end">
      <v-select v-model="rowsPerPage" color="is-dark" class="has-text-dark">
        >
        <option v-for="value in rowsPerPageOptions" :key="value" :value="value">
          {{ value }}
        </option>
      </v-select>
      <!-- using :disabled wont work, so instead the click action is conditioned and the buttons are always clickable -->
      <a class="pagination-previous" @click="currentPage > 0 && (currentPage -= 1)">Previous</a>
      <a
        class="pagination-next"
        @click="
          currentPage + 1 < Math.ceil(props.data.originalRows.length / rowsPerPage) &&
            (currentPage += 1)
        ">Next page</a>
    </div>

    <div class="tableFooter">
      <slot name="footer" />
    </div>
  </div>
</template>

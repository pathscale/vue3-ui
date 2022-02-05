<script>
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import VTag from '../../primitives/Tag/Tag.vue'
import VButton from '../../primitives/Button/Button.vue'
import VCheckbox from '../../primitives/Checkbox/Checkbox.vue'
import VSelect from '../../primitives/Select/Select.vue'
import VInput from '../../primitives/Input/Input.vue'
import VPagination from '../Pagination/Pagination.vue'

export default {
  name: 'VTable',
  components: { VButton, VCheckbox, VSelect, VTag, VInput, VPagination },
  props: {
    data: {
      type: Object,
      default: () => ({}),
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
      default: () => [],
    },
    bordered: Boolean,
    striped: Boolean,
    narrow: Boolean,
    hoverable: Boolean,
    fullwidth: Boolean,
    hasResetBtn: Boolean,
    sortable: Boolean,
    expandable: Boolean,
    draggableRows: Boolean,
    draggableColumns: Boolean,
    // eslint-disable-next-line vue/no-unused-properties -- editable prop being used in template
    editable: Boolean,
    groupBy: String,
    sticky: Boolean,
  },

  setup(props, { slots }) {
    // datagrid instance reference
    const data = ref(props.data)
    const computedRowsPerPage = ref(props.rowsPerPage)
    const currentPage = ref(0)
    const search = reactive({})
    const expandedRows = ref(new Set())
    const expandedGroups = ref(new Set())

    // whenever pagination props changes, update the class state accordingly
    // thsi way pagination settings are directly passed to props and indirectly passed to class

    // page goes back to first when rowperpage changes
    watch(computedRowsPerPage, () => {
      props.data.rowsPerPage = computedRowsPerPage.value
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
      props.data.rowsPerPage = computedRowsPerPage.value
      props.data.switchPage()
    }

    const sortColumn = column => {
      props.data.sortByColumn(column.name, column.ascendant)
      column.ascendant = !column.ascendant
    }

    const toggleExpanded = rowId => {
      if (expandedRows.value.has(rowId)) {
        expandedRows.value.delete(rowId)
        return
      }
      expandedRows.value.add(rowId)
    }

    const toggleExpandedGroup = group => {
      if (expandedGroups.value.has(group)) {
        expandedGroups.value.delete(group)
        return
      }
      expandedGroups.value.add(group)
    }

    const countColumns = computed(() => {
      return data.value.getColumns().length + (props.checkable ? 1 : 0) + (props.expandable ? 1 : 0)
    })

    const handlePageChange = value => {
      currentPage.value = value - 1 // pagination handle indexes from 1, table from 0
    }

    const handleSort = column => {
      if (props.sortable) {
        sortColumn(column)
      }
    }

    const columnClasses = column => {
      return {
        ...column.style,
        'has-text-primary': column.selected,
        'sticky-row': props.sticky,
      }
    }

    const selectedClasses = row => {
      return {
        'has-background-primary': row.selected,
        'has-text-white': row.selected,
      }
    }

    const cellClasses = column => {
      return {
        ...column.style,
        'sticky-column': column.sticky,
      }
    }

    const hasHeader = computed(() => {
      return slots.header || props.hasResetBtn
    })

    return {
      props,
      search,
      expandedRows,
      toggleExpanded,
      expandedGroups,
      toggleExpandedGroup,
      countColumns,
      handlePageChange,
      handleSort,
      columnClasses,
      selectedClasses,
      cellClasses,
      slots,
      hasHeader,
      currentPage,
      total: data.value.originalRows.length,
      computedRowsPerPage,
    }
  },
}
</script>

<template>
  <!-- eslint-disable @pathscale/vue3/v-directive  -->
  <div class="table-container" :class="{ 'sticky-table': sticky }">
    <div class="tableHeader" v-if="hasHeader">
      <slot name="header">
        <v-button
          @click="data.resetFilters()"
          v-if="hasResetBtn"
          type="is-light has-text-black"
          class="my-2">
          &#x21bb;
        </v-button>
      </slot>
    </div>
    <table
      class="table"
      :class="[
        {
          'is-bordered': bordered,
          'is-striped': striped,
          'is-narrow': narrow,
          'is-hoverable': hoverable,
          'is-fullwidth': fullwidth,
        },
      ]"
      style="position: relative;">
      <thead>
        <tr>
          <td v-if="checkable" />
          <td v-if="expandable" />
          <th
            v-for="(column, idx) in data.getColumns()"
            :key="idx"
            :class="columnClasses(column)"
            @click="handleSort(column)"
            :draggable="draggableColumns"
            @dragstart="data.onDragStartColumn($event, row, idx)"
            @drop="data.onDropColumn($event, column, idx)"
            @dragover="data.onDragOverColumn($event, column, idx)"
            @dragleave="data.onDragLeaveColumn($event, column, idx)">
            {{ column.caption }}
            <span v-if="sortable">
              {{ column.ascendant ? '&darr;' : '\t&uarr;' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="searchable">
          <td v-if="checkable" />
          <td v-if="expandable" />
          <td v-for="column in data.getColumns()" :key="column.name" :class="column.style">
            <v-input
              name="search"
              type="text"
              v-model="search[column.name]"
              @input="data.searchColumn(column.name, search[column.name])"
              placeholder="Search" />
          </td>
        </tr>
        <template v-if="!groupBy">
          <template v-for="(row, idx) in data.rows" :key="idx">
            <tr
              :draggable="draggableRows"
              @dragstart="data.onDragStartRow($event, row, idx)"
              @drop="data.onDropRow($event, row, idx)"
              @dragover="data.onDragOverRow($event, row, idx)"
              @dragleave="data.onDragLeaveRow($event, row, idx)"
              :class="selectedClasses(row)">
              <td v-if="checkable">
                <v-checkbox @change="data.toggleCheck($event, row)" />
              </td>
              <td v-if="expandable">
                <a @click="toggleExpanded(row.id)" class="is-primary">{{
                  expandedRows.has(row.id) ? '&uarr;' : '&darr;'
                }}</a>
              </td>
              <td
                v-for="column in data.getColumns()"
                :key="column.name"
                :class="cellClasses(column)"
                :contenteditable="props.editable"
                @blur="data.editCell(row, column, $event.target.textContent)">
                <slot :name="column.name" :row="row">
                  {{ row[column.name] }}
                </slot>
              </td>
            </tr>
            <tr class="expansion" v-if="expandedRows.has(row.id)">
              <td :colspan="countColumns">
                <slot name="expanded" :row="row" />
              </td>
            </tr>
          </template>
        </template>

        <template v-if="groupBy">
          <template v-for="(group, idx) in data.groups(groupBy)" :key="idx">
            <tr>
              <td :colspan="countColumns" class="is-aligned-center">
                <a @click="toggleExpandedGroup(group)" class="mr-4">{{
                  expandedGroups.has(group) ? '&darr;' : '&rarr;'
                }}</a>
                {{ groupBy }}:
                <v-tag type="is-primary" class="mx-4">
                  {{ group }}
                </v-tag>
              </td>
            </tr>
            <template v-if="expandedGroups.has(group)">
              <tr v-for="(row, rowIdx) in data.filterRows(groupBy, group)" :key="rowIdx">
                <td
                  v-for="column in data.getColumns()"
                  :key="column.name"
                  :class="column.style"
                  :contenteditable="props.editable"
                  @blur="data.editCell(row, column, $event.target.textContent)">
                  <slot :name="column.name" :row="row">
                    {{ row[column.name] }}
                  </slot>
                </td>
              </tr>
            </template>
          </template>
        </template>
      </tbody>
    </table>

    <div v-if="pagination" class="pagination-container px-1">
      <v-select v-model="computedRowsPerPage">
        >
        <option v-for="value in rowsPerPageOptions" :key="value" :value="value">
          {{ value }}
        </option>
      </v-select>

      <v-pagination
        class="px-1"
        :total="total"
        :current="currentPage + 1"
        @update:current="handlePageChange"
        :range-before="1"
        :range-after="1"
        order="is-centered"
        :per-page="computedRowsPerPage"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page" />
    </div>

    <div class="tableFooter" v-if="slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, watch, toRaw, watchEffect } from 'vue'
import VTag from '../../primitives/Tag/Tag.vue'
import VButton from '../../primitives/Button/Button.vue'
import VCheckbox from '../../primitives/Checkbox/Checkbox.vue'
import VSelect from '../../primitives/Select/Select.vue'
import VInput from '../../primitives/Input/Input.vue'
import VPagination from '../Pagination/Pagination.vue'

const UNKNOW = 'unknow'

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
    mobileCards: Boolean,
  },
  emits: ['update:data'],
  setup(props, { slots, emit }) {
    // datagrid instance reference
    const computedData = ref(props.data)
    const computedRowsPerPage = ref(props.rowsPerPage)
    const currentPage = ref(0)
    const search = reactive({})
    const expandedRows = ref(new Set())
    const expandedGroups = ref(new Set())
    // handle checked all state per page
    const checked = reactive({
      0: false,
    })

    const switchPage = () => {
      if (props.pagination) {
        computedData.value.rows = computedData.value.originalRows.slice(
          currentPage.value * computedData.value.rowsPerPage,
          currentPage.value * computedData.value.rowsPerPage + computedData.value.rowsPerPage,
        )
      }
    }

    watchEffect(() => {
      if (!props.pagination) {
        computedData.value = props.data
      }
    })

    // whenever pagination props changes, update the class state accordingly
    // thsi way pagination settings are directly passed to props and indirectly passed to class

    // page goes back to first when rowperpage changes
    watch(computedRowsPerPage, () => {
      computedData.value.rowsPerPage = computedRowsPerPage.value
      currentPage.value = 0
      switchPage()
    })

    // compute new rows window whenever currentpage changes
    watch(currentPage, () => {
      computedData.value.currentPage = currentPage.value
      switchPage()
    })

    // compute rows window on first render as no change cb triggers
    if (props.pagination) {
      computedData.value.rowsPerPage = computedRowsPerPage.value
      switchPage()
    }

    const sortColumn = column => {
      computedData.value.sortByColumn(column.name, column.ascendant)
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
      return (
        computedData.value.getColumns().length +
        (props.checkable ? 1 : 0) +
        (props.expandable ? 1 : 0)
      )
    })

    const handlePageChange = value => {
      currentPage.value = value - 1 // pagination handle indexes from 1, table from 0
    }

    const handleSort = column => {
      if (props.sortable && column.dataType !== UNKNOW) {
        sortColumn(column)
      }
    }

    const columnClasses = column => {
      return {
        ...column.style,
        'has-text-primary': column.selected,
        'sticky-row': props.sticky,
        'is-clickable': props.sortable && column.dataType !== UNKNOW,
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

    watch(
      [checked],
      () => {
        computedData.value.toggleCheckAll(toRaw(checked)[currentPage.value])
      },
      { deep: true },
    )

    const isChecked = row => {
      return computedData.value.checkedRows.has(row)
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
      total: computedData.value.originalRows.length,
      computedRowsPerPage,
      checked,
      isChecked,
      UNKNOW,
      computedData,
    }
  },
}
</script>

<template>
  <!-- eslint-disable @pathscale/vue3/v-directive  -->
  <div class="v-table">
    <div
      class="table-wrapper table-container"
      :class="{ 'sticky-table': sticky, 'has-mobile-cards': mobileCards }">
      <div class="tableHeader" v-if="hasHeader">
        <slot name="header">
          <v-button
            @click="computedData.resetFilters()"
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
        style="position: relative">
        <thead class="thead">
          <tr class="tr">
            <td class="td" v-if="checkable">
              <v-checkbox v-model="checked[currentPage]" />
            </td>
            <td v-if="expandable" />
            <th
              class="th"
              v-for="(column, idx) in computedData.getColumns()"
              :key="idx"
              :class="columnClasses(column)"
              @click="handleSort(column)"
              :draggable="draggableColumns"
              @dragstart="computedData.onDragStartColumn($event, row, idx)"
              @drop="computedData.onDropColumn($event, column, idx)"
              @dragover="computedData.onDragOverColumn($event, column, idx)"
              @dragleave="computedData.onDragLeaveColumn($event, column, idx)">
              {{ column.caption }}
              <span v-if="sortable && column.dataType !== UNKNOW">
                {{ column.ascendant ? '&darr;' : '\t&uarr;' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-if="searchable">
            <td v-if="checkable" />
            <td v-if="expandable" />
            <td
              v-for="column in computedData.getColumns()"
              :data-label="column.caption"
              :key="column.name"
              :class="column.style">
              <v-input
                v-if="column.dataType !== UNKNOW"
                name="search"
                type="text"
                v-model="search[column.name]"
                @input="computedData.searchColumn(column.name, search[column.name])"
                placeholder="Search" />
            </td>
          </tr>
          <template v-if="!groupBy">
            <template v-for="(row, idx) in computedData.rows" :key="idx">
              <tr
                :draggable="draggableRows"
                @dragstart="computedData.onDragStartRow($event, row, idx)"
                @drop="computedData.onDropRow($event, row, idx)"
                @dragover="computedData.onDragOverRow($event, row, idx)"
                @dragleave="computedData.onDragLeaveRow($event, row, idx)"
                :class="selectedClasses(row)">
                <td v-if="checkable">
                  <v-checkbox
                    @change="computedData.toggleCheck($event, row)"
                    :model-value="isChecked(row)" />
                </td>
                <td v-if="expandable">
                  <a @click="toggleExpanded(row.id)" class="is-primary">{{
                    expandedRows.has(row.id) ? '&uarr;' : '&darr;'
                  }}</a>
                </td>
                <td
                  v-for="column in computedData.getColumns()"
                  :data-label="column.caption"
                  :key="column.name"
                  :class="cellClasses(column)"
                  :contenteditable="props.editable"
                  @blur="computedData.editCell(row, column, $event.target.textContent)">
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
            <template v-for="(group, idx) in computedData.groups(groupBy)" :key="idx">
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
                <tr v-for="(row, rowIdx) in computedData.filterRows(groupBy, group)" :key="rowIdx">
                  <td
                    v-for="column in computedData.getColumns()"
                    :data-label="column.caption"
                    :key="column.name"
                    :class="column.style"
                    :contenteditable="props.editable"
                    @blur="computedData.editCell(row, column, $event.target.textContent)">
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
  </div>
</template>

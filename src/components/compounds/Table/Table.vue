<script setup lang="ts">
import VPagination from "@/components/compounds/Pagination/Pagination.vue";
import VButton from "@/components/primitives/Button/Button.vue";
import VCheckbox from "@/components/primitives/Checkbox/Checkbox.vue";
import VInput from "@/components/primitives/Input/Input.vue";
import VSelect from "@/components/primitives/Select/Select.vue";
import VTag from "@/components/primitives/Tag/Tag.vue";
import { computed, reactive, ref, toRaw, useSlots, watch } from "vue";
import DataGrid, { type Column, type Row, type CellValue } from "./DataGrid";

const UNKNOW = "unknow";

const props = withDefaults(
  defineProps<{
    data?: DataGrid;
    searchable?: boolean;
    checkable?: boolean;
    pagination?: boolean;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[]; // todo update docs: use 'Array<Number>', but not just 'Array'
    bordered?: boolean;
    striped?: boolean;
    narrow?: boolean;
    hoverable?: boolean;
    fullwidth?: boolean;
    hasResetBtn?: boolean;
    sortable?: boolean;
    expandable?: boolean;
    draggableRows?: boolean;
    draggableColumns?: boolean;
    editable?: boolean;
    groupBy?: string;
    sticky?: boolean;
    mobileCards?: boolean;
  }>(),
  {
    data: () => new DataGrid(),
    rowsPerPage: 5,
    rowsPerPageOptions: () => [],
  },
);

const slots = useSlots();

// datagrid instance reference
const data = ref(props.data);
const computedRowsPerPage = ref(props.rowsPerPage);
const currentPage = ref(0);
const search = reactive<Record<string, string>>({});
const expandedRows = ref(new Set<Row["id"]>());
const expandedGroups = ref(new Set());
// handle checked all state per page
const checked = reactive<Record<number, boolean>>({
  0: false,
});

// whenever pagination props changes, update the class state accordingly
// this way pagination settings are directly passed to props and indirectly passed to class

// page goes back to first when rowperpage changes
watch(computedRowsPerPage, () => {
  props.data.rowsPerPage = computedRowsPerPage.value;
  currentPage.value = 0;
  props.data.switchPage();
});

// compute new rows window whenever currentpage changes
watch(currentPage, () => {
  props.data.currentPage = currentPage.value;
  props.data.switchPage();
});

// compute rows window on first render as no change cb triggers
if (props.pagination) {
  props.data.rowsPerPage = computedRowsPerPage.value;
  props.data.switchPage();
}

const sortColumn = (column: Column) => {
  props.data.sortByColumn(column.name, column.ascendant);
  column.ascendant = !column.ascendant;
};

const toggleExpanded = (rowId: Row["id"]) => {
  if (expandedRows.value.has(rowId)) {
    expandedRows.value.delete(rowId);
    return;
  }
  expandedRows.value.add(rowId);
};

const toggleExpandedGroup = (group: CellValue) => {
  if (expandedGroups.value.has(group)) {
    expandedGroups.value.delete(group);
    return;
  }
  expandedGroups.value.add(group);
};

const countColumns = computed(() => {
  return (
    data.value.getColumns().length +
    (props.checkable ? 1 : 0) +
    (props.expandable ? 1 : 0)
  );
});

const handlePageChange = (value: number) => {
  currentPage.value = value - 1; // pagination handle indexes from 1, table from 0
};

const handleSort = (column: Column) => {
  if (props.sortable && column.dataType !== UNKNOW) {
    sortColumn(column);
  }
};

const columnClasses = (column: Column) => {
  return {
    ...column.style,
    "has-text-primary": column.selected,
    "sticky-row": props.sticky,
    "is-clickable": props.sortable && column.dataType !== UNKNOW,
  };
};

const selectedClasses = (row: Row) => {
  return {
    "has-background-primary": row.selected,
    "has-text-white": row.selected,
  };
};

const cellClasses = (column: Column) => {
  return {
    ...column.style,
    "sticky-column": column.sticky,
  };
};

watch(
  [checked],
  () => {
    data.value.toggleCheckAll(toRaw(checked)[currentPage.value]);
  },
  { deep: true },
);

const isChecked = (row: Row) => {
  return data.value.checkedRows.has(row);
};

const hasHeader = computed(() => {
  return slots.header || props.hasResetBtn;
});

const total = computed(() => data.value.originalRows.length);
</script>

<template>
  <div class="v-table">
    <div
      class="table-wrapper table-container"
      :class="{ 'sticky-table': sticky, 'has-mobile-cards': mobileCards }">
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
        style="position: relative">
        <thead class="thead">
          <tr class="tr">
            <td class="td" v-if="checkable">
              <v-checkbox v-model="checked[currentPage]" />
            </td>
            <td v-if="expandable" />
            <th
              class="th"
              v-for="(column, idx) in data.getColumns()"
              :key="idx"
              :class="columnClasses(column)"
              @click="handleSort(column)"
              :draggable="draggableColumns"
              @dragstart="data.onDragStartColumn($event, column, idx)"
              @drop="data.onDropColumn($event, column, idx)"
              @dragover="data.onDragOverColumn($event, column, idx)"
              @dragleave="data.onDragLeaveColumn($event, column, idx)">
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
              v-for="column in data.getColumns()"
              :data-label="column.caption"
              :key="column.name"
              :class="column.style">
              <v-input
                v-if="column.dataType !== UNKNOW"
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
                  <v-checkbox
                    @change="data.toggleCheck($event, row)"
                    :model-value="isChecked(row)" />
                </td>
                <td v-if="expandable">
                  <a @click="toggleExpanded(row.id)" class="is-primary">{{
                    expandedRows.has(row.id) ? '&uarr;' : '&darr;'
                  }}</a>
                </td>
                <td
                  v-for="column in data.getColumns()"
                  :data-label="column.caption"
                  :key="column.name"
                  :class="cellClasses(column)"
                  :contenteditable="props.editable"
                  @blur="data.editCell(row, column, ($event.target as HTMLElement).textContent ?? '')">
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
                    :data-label="column.caption"
                    :key="column.name"
                    :class="column.style"
                    :contenteditable="props.editable"
                    @blur="data.editCell(row, column, ($event.target as HTMLElement).textContent ?? '')">
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

<script>
import { computed, reactive, ref } from 'vue'
import { VInput, VButton, VCheckbox } from "../.."

const Table = {
  name: 'VTable',
  components: { VInput, VButton, VCheckbox },
  props: {
    data: {
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
    checked: {
      type: Array,
      default: [],
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
    hasResetBtn: {
      type: Boolean,
      default: false
    },
    sortable: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const data = ref(props.data)
    const columnProperties = ref(props.data.columns)

    for (const colName in props.data.columns) {
      columnProperties.value[colName].ascendant = true
    }

    const search = reactive({})
    const selected = reactive([])
    const checkedBoxes = reactive([])
    const currentPage = ref(0)

    if(props.checkable) {
      let iterator = 0
      props.data.rows.forEach(row => {
        checkedBoxes[iterator++] = 0
      })
    }

    const sortColumn = (colName) => {
      props.data.sortByColumn(colName, columnProperties.value[colName].ascendant)
      columnProperties.value[colName].ascendant = !columnProperties.value[colName].ascendant
    }
   
    const toggleCheck = (event, row) => {
      const new_checked_list = event.target.checked
        ? [...props.checked, row]
        : props.checked.filter(current_row => current_row.id !== row.id)
      emit('update:checked', new_checked_list)
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

    return {
      props,
      columnProperties,
      data,
      search,
      sortColumn,
      checkedBoxes,
      currentPage,
      toggleCheck,
      rootClasses
    }
  },
}
export default Table;
</script>

<template>
  <div class="data-grid">
    <div class="tableHeader">
      <slot name="header">
        <v-button @click="props.data.resetFilters()" v-if="props.hasResetBtn" type="is-light has-text-black" class="mt-2 ml-2">
          &#x21bb;
        </v-button>
      </slot>
    </div>
    <table class="table" :class="rootClasses">
      <thead>
        <tr>
          <td v-if="checkable" />
          <th
            v-for="column in props.data.columns"
            :key="column"
            @click="props.sortable ? sortColumn(column.name) : null">
            {{ column.caption }}
            <span v-if="props.sortable">
              {{ columnProperties[column.name].ascendant ? "&darr;" : "	&uarr;" }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="props.searchable">
          <td v-if="checkable" />
          <td v-for="column in props.data.columns" :key="column.name">
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
        <tr
          v-for="row in props.data.rows"
          :key="row.id">
          <td v-if="checkable">
            <v-checkbox @change="toggleCheck($event, row)" />
          </td>
          <td v-for="(content, field) in row" :key="content">
            <slot :name="field" :row="row">
              {{ content }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="tableFooter">
      <slot name="footer" />
    </div>
  </div>
</template>
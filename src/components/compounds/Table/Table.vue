<script>
import { computed, reactive, ref, watchEffect } from 'vue'
import { VInput, VButton, VCheckbox, VSelect } from '../..'

const Table = {
  name: 'VTable',
  components: { VInput, VButton, VCheckbox, VSelect },
  props: {
    data: {
      type: Array,
      default: [],
    },
    columns: {
      type: Array,
      default: [],
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    checkable: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Array,
      default: [],
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    rowsPerPage: {
      type: Number,
      default: 5,
    },
    isBordered: {
      type: Boolean,
      default: false,
    },
    isStriped: {
      type: Boolean,
      default: false,
    },
    isNarrow: {
      type: Boolean,
      default: false,
    },
    isHoverable: {
      type: Boolean,
      default: false,
    },
    isFullwidth: {
      type: Boolean,
      default: false,
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
    // state
    // const data = ref(props.data)
    // const columns = ref(props.columns)
    // const checked = ref(props.checked)
    const { data, columns, checked } = props

    const rowsPerPage = ref(5)
    const currentPage = ref(0)

    const search = reactive({})

    const sortedField = ref(null)
    const sortedDir = ref(-1)

    // computed properties
    const filtered_data = computed(() => {
      let ret_val

      // handle search
      ret_val = data.filter(row =>
        columns
          .map(column =>
            row[column.field]
              .toString()
              .toLowerCase()
              .includes(search[column.field]?.toLowerCase() ?? ''),
          )
          .every(show => show === true),
      )

      // handle sorting
      const column = sortedField.value
      if (!column) return ret_val

      ret_val.sort((a, b) => (a[column] < b[column] ? sortedDir.value * 1 : sortedDir.value * -1))
      return ret_val
    })

    const sliced_data = computed(() =>
      filtered_data.value.slice(
        rowsPerPage.value * currentPage.value,
        rowsPerPage.value * (currentPage.value + 1),
      ),
    )

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

    // actions
    const toggleCheck = (event, row) => {
      const new_checked_list = event.target.checked
        ? [...props.checked, row]
        : props.checked.filter(current_row => current_row.id !== row.id)

      emit('update:checked', new_checked_list)
    }

    const next = () => {
      if (currentPage.value !== Math.ceil(filtered_data.value.length / rowsPerPage.value) - 1)
        currentPage.value += 1
    }
    const back = () => {
      if (currentPage.value !== 0) currentPage.value -= 1
    }

    return {
      props,
      filtered_data,
      sliced_data,
      columns,
      search,
      rootClasses,
      toggleCheck,
      rowsPerPage,
      next,
      back,
      sortedField,
      sortedDir,
    }
  },
}

export default Table
</script>

<template>
  <div class="data-grid">
    <div class="tableHeader">
      <slot name="header" />
    </div>
    <table class="table" :class="rootClasses">
      <thead>
        <tr>
          <th v-if="checkable" />
          <th
            v-for="column in columns"
            :key="column.label"
            @click="
              () => {
                sortedField = column.field
                sortedDir = -sortedDir
              }
            "
          >
            <strong>{{ column.label }}</strong>
            {{ sortedField === column.field ? (sortedDir === -1 ? '&darr;' : '&uarr;') : '' }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="searchable">
          <td v-if="checkable" />
          <td v-for="column in columns" :key="column.field">
            <v-input
              v-model="search[column.field]"
              placeholder="search"
              class="input has-text-black is-small is-black"
            />
          </td>
        </tr>
        <!-- TODO, avoid duplication -->
        <template v-if="!pagination">
          <tr v-for="row in filtered_data" :key="row.id">
            <td v-if="checkable">
              <v-checkbox @change="toggleCheck($event, row)" />
            </td>
            <td v-for="column in columns" :key="row[column.field]">
              <slot :name="column.field" v-bind:row="row">
                {{ row[column.field] }}
              </slot>
            </td>
          </tr>
        </template>
        <!-- Same as above but with sliced_data -->
        <template v-if="pagination">
          <tr v-for="row in sliced_data" :key="row.id">
            <td v-if="checkable">
              <v-checkbox @change="toggleCheck($event, row)" />
            </td>
            <td v-for="column in columns" :key="row[column.field]">
              <slot :name="column.field" v-bind:row="row">
                {{ row[column.field] }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div
      class="pagination-wrapper"
      v-if="pagination"
      style="display: flex; justify-content: flex-end"
    >
      <v-select v-model="rowsPerPage">
        <option :value="5" selected>5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
      </v-select>
      <nav class="pagination" role="navigation" aria-label="pagination">
        <a class="pagination-previous" title="This is the first page" @click="back">&larr;</a>
        <a class="pagination-next" @click="next">&rarr;</a>
      </nav>
    </div>
    <div class="tableFooter">
      <slot name="footer" />
    </div>
  </div>
</template>

<style>
/* TODO: make this work and remove style tag from above */
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
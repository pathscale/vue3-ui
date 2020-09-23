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

    // const handleSearch = (field) => {
    //   props.data.rows = props.data.filter((row) => {
    //     return row[field].toString().toLowerCase().includes(search[field].toLowerCase())
    //   })
    // }

    // const resetData = () => {
    //   for(const field in search) {
    //     search[field] = ""
    //   }
    //   props.data.rows = props.data
    // }

    // const handleCheckbox = (row) => {
    //   const index = selected.indexOf(row)
    //   if(index > -1) {
    //     selected.splice(index, 1)
    //     checkedBoxes[data.value.indexOf(row)] = 0
    //   } else {
    //     selected.push(row)
    //     checkedBoxes[data.value.indexOf(row)] = 1
    //   }
    //   emit('checked-rows', selected)
    // }

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

    return { props, columnProperties, data, search, sortColumn, checkedBoxes, currentPage, switchPage, rootClasses }
  },
}

export default Table;
</script>

<template>
  <div class="data-grid">
    <div class="tableHeader">
      <slot name="header">
        <v-button @click="props.data.resetFilters()" type="is-light has-text-black" class="mt-2 ml-2">
          &#x21bb;
        </v-button>
      </slot>
    </div>
    <table class="table" :class="rootClasses">
      <thead>
        <tr>
          <th
            v-for="column in props.data.columns"
            :key="column"
            @click="sortColumn(column.name)">
            {{ column.caption }}
            {{ columnProperties[column.name].ascendant ? "&darr;" : "	&uarr;" }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="props.searchable">
          <!-- <td v-for="column in columns" :key="column.field">
            <input
              name="search"
              type="text"
              v-model="search[column.field]"
              @input="handleSearch(column.field)"
              color="is-dark"
              placeholder="Search"
              class="input has-text-black is-small is-black" />
          </td> -->
        </tr>
        <tr 
          v-for="row in props.data.rows"
          :key="row.id">
          <td v-for="(content, field) in row" :key="content">
            <slot :name="field" v-bind:row="row">
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

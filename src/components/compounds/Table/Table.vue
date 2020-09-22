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

    if(props.checkable) {
      let iterator = 0
      props.data.rows.forEach(row => {
        checkedBoxes[iterator++] = 0
      })
    }

    // const sortColumn = (col) => {
    //   props.data.rows.sort((a, b) => {
    //     if(a[col.field] < b[col.field]) { return col.ascendant ? -1 : 1 };
    //     if(a[col.field] > b[col.field]) { return col.ascendant ? 1 : -1 };
    //     return 0;
    //   })
    //   col.ascendant = !col.ascendant
    // }

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

    return { props, columns, data, search, checkedBoxes, currentPage, switchPage, rootClasses }
  },
}

export default Table;
</script>

<template>
  <div class="data-grid">
    <div class="tableHeader">
      <v-button @click="resetData" type="is-light has-text-black" class="mt-2 ml-2">
        &#x21bb;
      </v-button>
    </div>
    <table class="table" :class="rootClasses">
      <thead>
        <tr>
          <th
            v-for="column in props.data.columns"
            :key="column">
            {{ column.caption }}
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
    <!-- <div class="tableFooter mb-4">
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
    </div> -->
  </div>
</template>

import { toRaw } from 'vue'

type Column = {
  id?: number
  name: string
  caption: string
  dataType: string
  show: boolean
  ascendant: boolean
  selected?: boolean
  sortFunction(
    a: Record<string, unknown>,
    b: Record<string, unknown>,
    order: boolean,
    column: keyof Record<string, unknown>,
  ): number
}

type Row = {
  id: number
  selected?: boolean
}

const defaultSort = <V>(
  a: Record<string, V>,
  b: Record<string, V>,
  order: boolean,
  column: keyof Record<string, V>,
): number => {
  if (a[column] < b[column]) {
    return order ? -1 : 1
  }
  if (a[column] > b[column]) {
    return order ? 1 : -1
  }
  return 0
}

class DataGrid {
  columns: Column[]
  rows: Row[]
  originalRows: Row[]
  checkedRows: Set<Row>
  rowsPerPage: number
  currentPage: number
  draggingRow: { id: number } | null
  draggingRowIdx: number | null
  draggingColumn: { id?: number } | null
  draggingColumnIdx: number | null

  constructor() {
    this.columns = []
    this.rows = []
    this.originalRows = []
    this.checkedRows = new Set()
    this.rowsPerPage = 0
    this.currentPage = 0
    this.draggingRow = null
    this.draggingRowIdx = null
    this.draggingColumn = null
    this.draggingColumnIdx = null
  }

  addColumn(name: string, caption: string, dataType: string, sort = defaultSort): void {
    this.columns.push({
      name,
      caption,
      dataType,
      show: true,
      ascendant: true,
      sortFunction: sort,
    })
  }

  addRow(content: Row, index: number): void {
    if (typeof index !== 'undefined') {
      this.rows.splice(index, 0, content)
      this.originalRows.splice(index, 0, content)
    } else {
      this.rows.push(content)
      this.originalRows.push(content)
    }
  }

  deleteRow(index: number): void {
    this.rows.splice(index, 1)
    this.originalRows.splice(index, 1)
  }

  editCell(row: Row, column: Column, newValue: string | number): void {
    // @ts-ignore
    row[column.name] = newValue
  }

  sortByColumn(column: string, ascendant: boolean): void {
    // @ts-ignore
    const { sortFunction = defaultSort } = toRaw(this.columns).find(e => e.name === column)
    this.originalRows.sort((a, b) => sortFunction(a, b, ascendant, column))
    this.rows = this.originalRows.slice(0, this.rows.length)
  }

  resetFilters(): void {
    this.rows = [...this.originalRows]
  }

  searchColumn(colName: string, query: string): void {
    this.rows = this.originalRows.filter(row => {
      // @ts-ignore
      return row[colName].toString().toLowerCase().includes(query.toLowerCase())
    })
  }

  toggleCheck(evt: Event, row: Row): void {
    if ((evt.target as HTMLInputElement).checked) {
      this.checkedRows.add(row)
    } else {
      this.checkedRows.delete(row)
    }
  }

  toggleCheckAll(value: boolean): void {
    if (value) {
      this.rows.forEach(row => {
        this.checkedRows.add(row)
      })
    } else {
      this.rows.forEach(row => {
        this.checkedRows.delete(row)
      })
    }
  }

  switchPage(): void {
    this.rows = this.originalRows.slice(
      this.currentPage * this.rowsPerPage,
      this.currentPage * this.rowsPerPage + this.rowsPerPage,
    )
  }

  toggleColumn({ name }: { name: string }): void {
    this.columns = this.columns.map(column =>
      column.name === name ? { ...column, show: !column.show } : column,
    )
  }

  // returns visible columns
  getColumns(): Column[] {
    return this.columns.filter(column => column.show)
  }

  onDragStartRow(_evt: Event, row: Row, idx: number): void {
    this.draggingRow = row
    this.draggingRowIdx = idx
  }

  onDropRow(_evt: Event, _row: Row, idx: number): void {
    // @ts-ignore
    const chunk = this.rows.splice(this.draggingRowIdx, 1)
    this.rows.splice(idx, 0, chunk[0])
    this.resetDraggingRow()
  }

  onDragOverRow(evt: Event, _row: Row, idx: number): void {
    if (this.draggingRowIdx === null) return

    this.rows[idx].selected = true
    evt.preventDefault()
  }

  onDragLeaveRow(_evt: Event, _row: Row, idx: number): void {
    this.rows[idx].selected = false
  }

  resetDraggingRow(): void {
    this.rows.forEach(row => {
      row.selected = false
    })
    this.draggingRow = null
    this.draggingRowIdx = null
  }

  onDragStartColumn(_evt: Event, column: Column, idx: number): void {
    this.draggingColumn = column
    this.draggingColumnIdx = idx
  }

  // callback called when user drops a column
  onDropColumn(_evt: Event, _column: Column, idx: number): void {
    // @ts-ignore
    const chunk = this.columns.splice(this.draggingColumnIdx, 1)
    this.columns.splice(idx, 0, chunk[0])
    this.resetDraggingColumn()
  }

  // the event must be prevented for the onDrop method to get called
  onDragOverColumn(evt: Event, _column: Column, idx: number): void {
    if (this.draggingColumnIdx === null) return

    this.columns[idx].selected = true
    evt.preventDefault()
  }

  onDragLeaveColumn(_evt: Event, _column: Column, idx: number): void {
    this.columns[idx].selected = false
  }

  resetDraggingColumn(): void {
    this.columns.forEach(column => {
      column.selected = false
    })
    this.draggingColumn = null
    this.draggingColumnIdx = null
  }

  // returns an object that maps column names to column instances
  getColumnsObject(): Record<string, Column> {
    return this.columns.reduce((obj, column) => {
      // @ts-ignore
      obj[column.name] = column
      return obj
    }, {})
  }

  groups(column: string): Set<number | boolean> {
    return this.rows.reduce(
      (set, row) => {
        // @ts-ignore
        set.add(row[column])
        return set
      },
      new Set() as Set<number | boolean>,
    )
  }

  filterRows(column: string, value: string | number): Row[] {
    // @ts-ignore
    return this.rows.filter(row => row[column] === value)
  }
}

export default DataGrid

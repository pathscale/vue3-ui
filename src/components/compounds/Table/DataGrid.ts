type Column = {
  id?: number,
  name: string,
  caption: string,
  dataType: string,
  style: string,
  show: boolean,
  ascendant: boolean,
  sticky: boolean,
  selected?: boolean
}

type Row = {
  id: number,
  selected?: boolean
}

class DataGrid {
  columns: Column[];
  rows: Row[];
  originalRows: Row[];
  checkedRows: {id: number}[];
  rowsPerPage: number;
  currentPage: number;
  draggingRow: {id: number};
  draggingRowIdx: number;
  draggingColumn: {id?: number};
  draggingColumnIdx: number;

  constructor() {
    this.columns = [];
    this.rows = [];
    this.originalRows = [];
    this.checkedRows = [];
    this.rowsPerPage = 0;
    this.currentPage = 0;
    this.draggingRow = null;
    this.draggingRowIdx = null;
    this.draggingColumn = null;
    this.draggingColumnIdx = null;
  }

  addColumn(name: string, caption: string, dataType: string, style: string, sticky = false) {
    this.columns.push({
      name,
      caption,
      dataType,
      style,
      show: true,
      ascendant: true,
      sticky
    })
  }

  addRow(content: Row, index: number) {
    if(typeof index !== 'undefined') {
      this.rows.splice(index, 0, content)
      this.originalRows.splice(index, 0, content)
    } else {
      this.rows.push(content)
      this.originalRows.push(content)
    }
  }

  deleteRow(index: number) {
    this.rows.splice(index, 1)
    this.originalRows.splice(index, 1)
  }

  // eslint-disable-next-line class-methods-use-this
  editCell(row: Row, column: Column, newValue: string | number) {
    row[column.name] = newValue
  }

  sortByColumn(column: string, ascendant: boolean) {
    this.rows.sort((a, b) => {
      if(a[column] < b[column]) { return ascendant ? -1 : 1 }
      if(a[column] > b[column]) { return ascendant ? 1 : -1 }
      return 0;
    })
  }

  resetFilters() {
    this.rows = [...this.originalRows]
  }

  searchColumn(colName: string, query: string) {
    this.rows = this.originalRows.filter((row) => {
      return row[colName].toString().toLowerCase().includes(query.toLowerCase())
    })
  }

  toggleCheck(evt: Event, row: Row) {
    this.checkedRows = (evt.target as HTMLInputElement).checked
      ? [...this.checkedRows, row]
      : this.checkedRows.filter(currentRow => currentRow.id !== row.id)
  }

  switchPage() {
    this.rows = this.originalRows.slice(this.currentPage*this.rowsPerPage, this.currentPage*this.rowsPerPage + this.rowsPerPage)
  }

  toggleColumn({ name } : { name: string }) {
    this.columns = this.columns.map(column => column.name === name ? ({ ...column, show: !column.show }) : column)
  }

  // returns visible columns
  getColumns() {
    return this.columns.filter(column => column.show)
  }

  onDragStartRow(evt: Event, row: Row, idx: number) {
    this.draggingRow = row;
    this.draggingRowIdx = idx;
  }

  onDropRow(evt: Event, row: Row, idx: number) {
    const chunk = this.rows.splice(this.draggingRowIdx, 1)
    this.rows.splice(idx, 0, chunk[0])
    this.resetDraggingRow()
  }

  onDragOverRow(evt: Event, row: Row, idx: number) {
    if (this.draggingRowIdx === null) return;

    this.rows[idx].selected = true
    evt.preventDefault()
  }

  onDragLeaveRow(evt: Event, row: Row, idx: number) {
    this.rows[idx].selected = false
  }

  resetDraggingRow() {
    this.rows.forEach(row => {
      row.selected = false
    })
    this.draggingRow = null;
    this.draggingRowIdx = null;
  }

  onDragStartColumn(evt: Event, column: Column, idx: number) {
    this.draggingColumn = column;
    this.draggingColumnIdx = idx;
  }

  // callback called when user drops a column
  onDropColumn(evt: Event, column: Column, idx: number) {
    const chunk = this.columns.splice(this.draggingColumnIdx, 1)
    this.columns.splice(idx, 0, chunk[0])
    this.resetDraggingColumn()
  }

  // the event must be prevented for the onDrop method to get called
  onDragOverColumn(evt: Event, column: Column, idx: number) {
    if (this.draggingColumnIdx === null) return;

    this.columns[idx].selected = true
    evt.preventDefault()
  }

  onDragLeaveColumn(evt: Event, column: Column, idx: number) {
    this.columns[idx].selected = false
  }

  resetDraggingColumn() {
    this.columns.forEach(column => {
      column.selected = false
    })
    this.draggingColumn = null;
    this.draggingColumnIdx = null;
  }

  // returns an object that maps column names to column instances
  getColumnsObject() {
    return this.columns.reduce((obj, column) => {
      obj[column.name] = column
      return obj;
    } , {})
  }

  groups(column: string) {
    return this.rows.reduce((set, row) => {
      set.add(row[column])
      return set;
    }, new Set())
  }

  filterRows(column: string, value: string | number) {
    return this.rows.filter(row => row[column] === value)
  }
}

export default DataGrid

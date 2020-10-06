class DataGrid {
  columns: any[];
  rows: any[];
  originalRows: object[];
  checkedRows: {id: any}[];
  rowsPerPage: number;
  currentPage: number;
  draggingRow: {id: any};
  draggingRowIdx: number;
  draggingColumn: {id: any};
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

  addColumn(name: string, caption: string, dataType: string, style: string, sticky: boolean = false) {
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

  addRow(content: object, index: number) {
    if(typeof index !== 'undefined') {
      this.rows.splice(index, 0, content)
      this.originalRows.splice(index, 0, content)
    } else {
      this.rows.push(content)
      this.originalRows.push(content)
    }
  }

  deleteRow(index) {
    this.rows.splice(index, 1)
    this.originalRows.splice(index, 1)
  }

  editCell(row, column, newValue) {
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

  toggleCheck(event, row) {
    this.checkedRows = event.target.checked
      ? [...this.checkedRows, row]
      : this.checkedRows.filter(current_row => current_row.id !== row.id)
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

  onDragStartRow(event, row, idx) {
    this.draggingRow = row;
    this.draggingRowIdx = idx;
  }

  onDropRow(event, row, idx) {
    const chunk = this.rows.splice(this.draggingRowIdx, 1)
    this.rows.splice(idx, 0, chunk[0])
    this.resetDraggingRow()
  }

  onDragOverRow(event, row, idx) {
    if (this.draggingRowIdx === null) return;

    this.rows[idx].selected = true
    event.preventDefault()
  }

  onDragLeaveRow(event, row, idx) {
    this.rows[idx].selected = false
  }

  resetDraggingRow() {
    this.rows.forEach(row => row.selected = false)
    this.draggingRow = null;
    this.draggingRowIdx = null;
  }

  onDragStartColumn(event, column, idx) {
    this.draggingColumn = column;
    this.draggingColumnIdx = idx;
  }

  // callback called when user drops a column
  onDropColumn(event, column, idx) {
    const chunk = this.columns.splice(this.draggingColumnIdx, 1)
    this.columns.splice(idx, 0, chunk[0])
    this.resetDraggingColumn()
  }

  // the event must be prevented for the onDrop method to get called
  onDragOverColumn(event, column, idx) {
    if (this.draggingColumnIdx === null) return;

    this.columns[idx].selected = true
    event.preventDefault()
  }

  onDragLeaveColumn(event, column, idx) {
    this.columns[idx].selected = false
  }

  resetDraggingColumn() {
    this.columns.forEach(column => column.selected = false)
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

  groups(column) {
    return this.rows.reduce((set, row) => {
      set.add(row[column])
      return set;
    }, new Set())
  }

  filterRows(column, value) {
    return this.rows.filter(row => row[column] === value)
  }
}

export default DataGrid

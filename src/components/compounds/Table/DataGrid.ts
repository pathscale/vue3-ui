import { type } from "os";
import { threadId } from "worker_threads";

class DataGrid {
  columns: object;
  rows: any[];
  originalRows: object[];
  checkedRows: {id: any}[];
  rowsPerPage: number;
  currentPage: number;
  draggingRow: {id: any};
  draggingRowIdx: number;

  constructor() {
    this.columns = {};
    this.rows = [];
    this.originalRows = [];
    this.checkedRows = [];
    this.rowsPerPage = 0;
    this.currentPage = 0;
    this.draggingRow = null;
    this.draggingRowIdx = null;
  }

  addColumn(name: string, caption: string, dataType: string, style: string) {
    this.columns[name] = {
      name,
      caption,
      dataType,
      style,
      show: true
    }
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

  sortByColumn(column: string, ascendant: boolean) {
    this.rows.sort((a, b) => {
      if(a[column] < b[column]) { return ascendant ? -1 : 1 };
      if(a[column] > b[column]) { return ascendant ? 1 : -1 };
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

  // pagination
  switchPage() {
    this.rows = this.originalRows.slice(this.currentPage*this.rowsPerPage, this.currentPage*this.rowsPerPage + this.rowsPerPage)
  }

  // hide / show columns
  showColumn(name: string) {
    this.columns[name].show = true
  }

  hideColumn(name: string) {
    this.columns[name].show= false
  }

  toggleColumn(column) {
    column.show ? this.hideColumn(column.name) : this.showColumn(column.name)
  }

  // construct new columns object with only the subobjects that have a key show as true
  getColumns() {
    return Object.keys(this.columns).filter(column => this.columns[column].show).reduce((newColumns, key) => {
      newColumns[key] = this.columns[key]
      return newColumns
    }, {})
  }

  /**
   * Row dragging methods
  */
  onDragStart(event, row, idx) {
    this.draggingRow = row;
    this.draggingRowIdx = idx;
  }

  onDragEnd(event, row, idx) {
    // do nothing
  }

  // callback called when user drops a row
  onDrop(event, row, idx) {
    const chunk = this.rows.splice(this.draggingRowIdx, 1)
    this.rows.splice(idx, 0, chunk[0])

    // remove selected from all rows
    this.rows.forEach(row => row.selected = false)
  }

  // the event must be prevented for the onDrop method to get called
  onDragOver(event, row, idx) {
    this.rows[idx].selected = true
    event.preventDefault()
  }

  onDragLeave(event, row, idx) {
    this.rows[idx].selected = false
  }
}

export default DataGrid
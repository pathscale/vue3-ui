class DataGrid {
  columns: object;
  rows: object[];
  originalRows: object[];
  checkedRows: {id: any}[];
  rowsPerPage: number;
  currentPage: number;

  constructor() {
    this.columns = {};
    this.rows = [];
    this.originalRows = [];
    this.checkedRows = [];
    this.rowsPerPage = 0;
    this.currentPage = 0;
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

  addRow(content: object) {
    this.rows.push(content)
    this.originalRows.push(content)
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
}

export default DataGrid
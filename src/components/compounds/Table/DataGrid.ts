class DataGrid {
  columns: object;
  rows: object[];
  originalRows: object[];
  checkedRows: {id: any}[];

  constructor() {
    this.columns = {};
    this.rows = [];
    this.originalRows = [];
    this.checkedRows = [];
  }

  addColumn(name: string, caption: string, dataType: string) {
    this.columns[name] = {
      name,
      caption,
      dataType
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
}

export default DataGrid
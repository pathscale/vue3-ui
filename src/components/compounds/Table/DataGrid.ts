class DataGrid {
  columns: object;
  rows: object[];

  constructor() {
    this.columns = {};
    this.rows = [];
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
  }

  sortByColumn(column: string, ascendant: boolean) {
    this.rows.sort((a, b) => {
      if(a[column] < b[column]) { return ascendant ? -1 : 1 };
      if(a[column] > b[column]) { return ascendant ? 1 : -1 };
      return 0;
    })
  }
}

export { DataGrid }
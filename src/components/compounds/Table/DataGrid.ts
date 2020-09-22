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
}

export { DataGrid }
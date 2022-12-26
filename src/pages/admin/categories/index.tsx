// Types
import { ReactElement } from "react";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

// Components
import { Table } from "src/components";

export default function Categories(): ReactElement {
  const columns: GridColDef[] = [
    { field: "col1", headerName: "ID", width: 50 },
    { field: "col2", headerName: "Name", flex: 1 },
    { field: "col3", headerName: "Total products", flex: 0.5 },
    { field: "col4", headerName: "Available products", flex: 0.5 },
    { field: "col5", headerName: "Publish status", flex: 0.5 },
  ];

  // Columns data
  const rows: GridRowsProp = [
    {
      id: 1,
      col1: 1,
      col2: "Telefoane colorate parfumate la 5 leila 5 leila 5 leila 5 leila 5 lei",
      col3: 3,
      col4: 2,
      col5: "Draft",
    },
    {
      id: 2,
      col1: 2,
      col2: "Anvelope",
      col3: 4,
      col4: 1,
      col5: "Live",
    },
    {
      id: 3,
      col1: 3,
      col2: "Sucuri",
      col3: 15,
      col4: 42,
      col5: "Draft",
    },
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      <Table columns={columns} rows={rows} />
    </div>
  );
}

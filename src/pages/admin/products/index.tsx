// Types
import { ReactElement } from "react";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

// Components
import { Table } from "src/components";

export default function Products(): ReactElement {
  const columns: GridColDef[] = [
    { field: "col1", headerName: "ID", width: 50 },
    { field: "col2", headerName: "Name", flex: 1 },
    { field: "col3", headerName: "SKU", flex: 0.5 },
    { field: "col4", headerName: "Price", flex: 0.5 },
    { field: "col5", headerName: "Stock quantity", flex: 0.5 },
    { field: "col6", headerName: "Category", flex: 1 },
    { field: "col7", headerName: "Publish status", flex: 0.5 },
  ];

  // Columns data
  const rows: GridRowsProp = [
    {
      id: 1,
      col1: 1,
      col2: "Telefon 1",
      col3: "TL1",
      col4: 25.4,
      col5: 35,
      col6: "Categorie de test 1",
      col7: "Draft",
    },
    {
      id: 2,
      col1: 2,
      col2: "Telefon 2",
      col3: "TL2",
      col4: 42.2,
      col5: 2,
      col6: "Categorie de test 2",
      col7: "Draft",
    },
    {
      id: 3,
      col1: 3,
      col2: "Telefon 3",
      col3: "TL3",
      col4: 11,
      col5: 0,
      col6: "Categorie de test 3",
      col7: "Live",
    },
  ];

  return (
    <div style={{ marginTop: "100px" }}>
      <Table columns={columns} rows={rows} />
    </div>
  );
}

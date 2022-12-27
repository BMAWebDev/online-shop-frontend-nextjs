// Types
import { ReactElement } from "react";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { GetServerSideProps } from "next";

interface IProps {
  products: any[];
}

// Components
import { Table } from "src/components";
import { Button } from "src/components";

// Modules
import Link from "next/link";

// Auth
import { checkAuth } from "src/auth";

export default function Products({ products }: IProps): ReactElement {
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
  ];

  if (!products.length)
    return (
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <p>No products in here. Create one in order to see it here.</p>

        <Link href="/admin/products/create">
          <Button style={{ marginTop: "50px" }}>Add new product</Button>
        </Link>
      </div>
    );

  return (
    <div style={{ marginTop: "100px" }}>
      <Link href="/admin/products/create">
        <Button style={{ marginBottom: "10px", marginLeft: "25px" }}>
          Add new product
        </Button>
      </Link>

      <Table columns={columns} rows={rows} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authRes: any = await checkAuth(context);
  let { redirect, props } = authRes;

  if (redirect) return authRes;

  // get products... (waiting for backend controller to be created)
  const products: any = [];
  props = { ...props, products };

  return {
    props,
  };
};

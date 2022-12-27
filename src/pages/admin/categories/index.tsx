// Types
import { ReactElement } from "react";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { GetServerSideProps } from "next";

interface IProps {
  categories: any[];
}

// Components
import { Table } from "src/components";
import { Button } from "src/components";

// Modules
import Link from "next/link";

// Auth
import { checkAuth } from "src/auth";

export default function Categories({ categories }: IProps): ReactElement {
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
  ];

  if (!categories.length)
    return (
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <p>No categories in here. Create one in order to see it here.</p>

        <Link href="/admin/categories/create">
          <Button style={{ marginTop: "50px" }}>Add new category</Button>
        </Link>
      </div>
    );

  return (
    <div style={{ marginTop: "100px" }}>
      <Link href="/admin/categories/create">
        <Button style={{ marginBottom: "10px", marginLeft: "25px" }}>
          Add new category
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

  // get categories... (waiting for backend controller to be created)
  const categories: any = [];
  props = { ...props, categories };

  return {
    props,
  };
};

// Types
import { ReactElement } from "react";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { GetServerSideProps } from "next";
import { ICategory } from "src/types";

interface IProps {
  categories: ICategory[];
}

// Components
import { Table, Button } from "src/components";

// Modules
import Link from "next/link";

// Auth
import { checkAuth } from "src/auth";

export default function Categories({ categories }: IProps): ReactElement {
  const columns: GridColDef[] = [
    { field: "col1", headerName: "ID", width: 50 },
    { field: "col2", headerName: "Name", flex: 1 },
    { field: "col3", headerName: "Total products", flex: 0.5 },
    { field: "col4", headerName: "Publish status", flex: 0.5 },
  ];

  // Columns data
  const rows: GridRowsProp = categories.map((category) => {
    return {
      id: category.id,
      col1: category.id,
      col2: category.name,
      col3: category.total_products,
      col4: category.publish_status,
    };
  });

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

      <Table tableType="categories" columns={columns} rows={rows} />
    </div>
  );
}

import { getCategories, getTokenFromCookie } from "src/functions";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const authRes: any = await checkAuth(context);
  const { req } = context;
  let { redirect, props } = authRes;

  if (redirect) return authRes;

  const categoriesRes: any = await getCategories(
    getTokenFromCookie(req.headers.cookie as string)
  );

  const categories: ICategory[] = categoriesRes.categories; // array of categories
  props = { ...props, categories };

  return {
    props,
  };
};

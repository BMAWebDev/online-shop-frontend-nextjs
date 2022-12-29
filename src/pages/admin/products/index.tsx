// Types
import { ReactElement } from "react";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { GetServerSideProps } from "next";
import { IProduct } from "src/types";

interface IProps {
  products: IProduct[];
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
    { field: "col6", headerName: "Category ID", flex: 1 },
    { field: "col7", headerName: "Publish status", flex: 0.5 },
  ];

  // Columns data
  const rows: GridRowsProp = products.map((product) => {
    return {
      id: product.id,
      col1: product.id,
      col2: product.name,
      col3: product.sku,
      col4: `${product.price} RON`,
      col5: product.stock_qty,
      col6: product.category_id ? product.category_id : 0,
      col7: product.publish_status,
    };
  });

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

      <Table tableType="products" columns={columns} rows={rows} />
    </div>
  );
}

import { getProducts, getTokenFromCookie } from "src/functions";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const authRes: any = await checkAuth(context);
  const { req } = context;
  let { redirect, props } = authRes;

  if (redirect) return authRes;

  const productsRes: any = await getProducts(
    getTokenFromCookie(req.headers.cookie as string)
  );

  const products: IProduct[] = productsRes.products; // array of products
  props = { ...props, products };

  return {
    props,
  };
};

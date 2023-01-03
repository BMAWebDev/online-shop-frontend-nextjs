// Types
import { ReactElement } from "react";
import {
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { ICartProduct } from "src/types";

// Components
import { Table } from "src/components";
import { Button } from "src/components";

// Modules
import Link from "next/link";
import { useEffect, useState } from "react";

// Store
import { cartStore } from "src/store";

export default function Cart(): ReactElement {
  const cart = cartStore();
  const [products, setProducts] = useState<ICartProduct[]>([]);

  useEffect(() => {
    if (cart.products.length) setProducts(cart.products);
  }, [cart.products]);

  const columns: GridColDef[] = [
    { field: "col1", headerName: "ID", width: 50 },
    { field: "col2", headerName: "Name", flex: 1 },
    { field: "col3", headerName: "Price", flex: 0.5 },
    {
      field: "col4",
      headerName: "Quantity",
      flex: 0.5,
      renderCell: (params: GridRenderCellParams) => (
        <input
          type="number"
          defaultValue={params.row.col4}
          onChange={(e) => {
            let val = parseInt(e.target.value);

            if (val > parseInt(e.target.max)) {
              e.target.value = e.target.max;
              val = parseInt(e.target.max);
            }

            cart.updateProductQuantity(val, params.row.col1);
          }}
          min="1"
          max={
            cart.products.find((_prod) => _prod.id === params.row.col1)
              ?.full_product.stock_qty
          }
          style={{
            borderRadius: "8px",
            border: "0",
            outline: "none",
            padding: "5px 10px",
          }}
        />
      ),
    },
  ];

  // Columns data
  const rows: GridRowsProp = products.map((product) => {
    return {
      id: product.id,
      slug: product.full_product.slug,
      col1: product.id,
      col2: product.full_product.name,
      col3: `${(product.full_product.price * product.quantity).toFixed(2)} RON`,
      col4: product.quantity,
    };
  });

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      {(products?.length > 0 && (
        <>
          <Table tableType="cart" columns={columns} rows={rows} />

          <Link href="/checkout" passHref>
            <Button style={{ display: "flex", marginTop: "25px" }}>
              Checkout
            </Button>
          </Link>
        </>
      )) || <p>Your cart is empty.</p>}
    </div>
  );
}

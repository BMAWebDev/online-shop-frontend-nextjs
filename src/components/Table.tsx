// Modules
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
  GridFooterContainer,
  GridFooter,
} from "@mui/x-data-grid";
import Link from "next/link";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

// Types
import { ReactElement } from "react";
import { ICartStoreProps } from "src/store/cart";

interface IProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  tableType: "products" | "categories" | "cart";
}

// Components
import Button from "./Button";

// Functions
import { deleteCategory, deleteProduct } from "src/functions";

// Store
import { cartStore } from "src/store";

export default function Table({
  columns,
  rows,
  tableType,
}: IProps): ReactElement {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalCustomText, setModalCustomText] = useState<string>("");
  const [modalHandlerValue, setModalHandlerValue] = useState<number>(0);

  const router = useRouter();

  // CART START
  const [cartTotalPrice, setCartTotalPrice] = useState<string>("0.00");
  const cart = cartStore();

  const calculateCartPrice = (cart: ICartStoreProps): string => {
    let totalProductsPrice = 0;
    cart.products.forEach((product) => {
      totalProductsPrice += product.quantity * product.full_product.price;
    });

    return totalProductsPrice.toFixed(2);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCartTotalPrice(calculateCartPrice(cart));

      cartStore.subscribe((state) => {
        setCartTotalPrice(calculateCartPrice(state));
      });
    }
  }, [cart.products]);

  // custom column for client quick options
  const clientRenderQuickOptions = (params: GridRenderCellParams) => {
    const productSlug = params.row.slug;
    const productName = params.row.col2;
    const productID = parseInt(params.id as string);

    return (
      <div className="d-flex align-items-center" style={{ gap: "15px" }}>
        <Link href={`/products/${productSlug}`} passHref={true}>
          <Button isSmall>View</Button>
        </Link>

        <Button
          buttonType="danger"
          onClick={() => {
            setShowModal(true);
            setModalCustomText(
              `Are you sure you want to delete ${productName} from your cart?`
            );
            setModalHandlerValue(productID as number);
          }}
          isSmall
        >
          Delete
        </Button>
      </div>
    );
  };

  // footer for cart page
  const renderCustomFooter = () => {
    return (
      <GridFooterContainer>
        <p style={{ marginLeft: "15px" }}>
          Products total price: {cartTotalPrice} RON
        </p>

        <GridFooter
          sx={{
            border: "none",
          }}
        />
      </GridFooterContainer>
    );
  };
  // CART END

  // custom column for admin quick options
  const adminRenderQuickOptions = (params: GridRenderCellParams) => {
    const rowID = params.id;
    const rowName = params.row.col2;

    const element = (
      <div className="d-flex justify-content-between" style={{ gap: 15 }}>
        <Link
          href={
            tableType == "categories"
              ? `/products?cat=${rowID}`
              : `/products/${rowID}`
          }
          passHref={true}
        >
          <Button isSmall>View</Button>
        </Link>

        <Link href={`/admin/${tableType}/${rowID}`} passHref={true}>
          <Button isSmall>Edit</Button>
        </Link>

        <Button
          isSmall
          buttonType="danger"
          onClick={() => {
            setShowModal(true);
            setModalCustomText(`Are you sure you want to delete ${rowName}?`);
            setModalHandlerValue(rowID as number);
          }}
        >
          Delete
        </Button>
      </div>
    );

    return element;
  };

  columns = [
    ...columns,
    {
      field: "col",
      headerName: "Quick options",
      flex: 1,
      renderCell: (params: GridRenderCellParams) =>
        tableType === "cart"
          ? clientRenderQuickOptions(params)
          : adminRenderQuickOptions(params),
    },
  ];

  const changePagination = (perPage: number) => {
    console.log(perPage);
  };

  const handleDelete = async (row_id: number) => {
    if (tableType === "cart") {
      cart.removeProduct(row_id);

      router.reload();

      return null;
    }

    try {
      const deleteRes: any =
        tableType == "categories"
          ? await deleteCategory(row_id)
          : await deleteProduct(row_id);

      toast.success(deleteRes.message);

      router.reload();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        rowsPerPageOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: {
            pageSize: 10,
          },
        }}
        onPageSizeChange={(selectedPerPageOption: number) =>
          changePagination(selectedPerPageOption)
        }
        sx={{
          boxShadow: 2,
          border: 0,
          backgroundColor: "grey",
          color: "white",
          "& .MuiDataGrid-cell": {
            padding: "10px",
          },
          "& .MuiDataGrid-row:hover": {
            color: "black",
          },
          fontSize: 16,
        }}
        getRowHeight={() => "auto"}
        components={{
          Footer: tableType !== "cart" ? undefined : renderCustomFooter,
        }}
      />

      <Modal
        handler={handleDelete}
        modalHandlerValue={modalHandlerValue}
        text={modalCustomText}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

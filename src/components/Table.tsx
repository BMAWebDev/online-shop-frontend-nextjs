// Modules
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Link from "next/link";
import Modal from "./Modal";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

// Types
import { ReactElement } from "react";

interface IProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  tableType: "products" | "categories";
}

// Components
import Button from "./Button";

// Functions
import { deleteCategory, deleteProduct } from "src/functions";

export default function Table({
  columns,
  rows,
  tableType,
}: IProps): ReactElement {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalCustomText, setModalCustomText] = useState<string>("");
  const [modalHandlerValue, setModalHandlerValue] = useState<number>(0);

  const router = useRouter();

  // custom column for quick options
  const renderQuickOptions = (params: GridRenderCellParams) => {
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
      renderCell: (params: GridRenderCellParams) => renderQuickOptions(params),
    },
  ];

  const changePagination = (perPage: number) => {
    console.log(perPage);
  };

  const handleDelete = async (row_id: number) => {
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

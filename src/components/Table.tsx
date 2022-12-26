// Modules
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Link from "next/link";

// Types
import { ReactElement } from "react";

interface IProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

// Components
import Button from "./Button";

export default function Table({ columns, rows }: IProps): ReactElement {
  // custom column for quick options
  const renderQuickOptions = (params: GridRenderCellParams) => {
    const rowID = params.id;
    const rowName = params.row.col2;

    const element = (
      <div className="d-flex justify-content-between" style={{ gap: 15 }}>
        <Link href={`/products?cat=${rowID}`} as="/products" passHref={true}>
          <Button isSmall>View</Button>
        </Link>

        <Link href={`/admin/categories/${rowID}`} passHref={true}>
          <Button isSmall>Edit</Button>
        </Link>

        <Button
          isSmall
          buttonType="danger"
          onClick={() =>
            alert(
              `Are you sure you want to delete ${rowName}? Category ID: ${rowID}`
            )
          }
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
    </div>
  );
}

'use client';
import { format } from "timeago.js";
import { Box } from "@mui/material";
import { DataGrid,GridColDef } from "@mui/x-data-grid";
import useSubscribersData from "@/shared/hooks/useSubscribeData";

const SubscribersData = () => {
  const {data,loading} = useSubscribersData();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.8 },
    { field: "createdAt", headerName: "Subscribed At", flex: 0.5 },
    { field: "source", headerName: "Source", flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => <h1>{params.row.status}</h1>,
    },
  ];

  // Rows data processing
  const rows = data?.map((item: subscribersDataTypes) => ({
    id: item?._id,
    email: item?.email,
    createdAt: format(item?.createdAt),
    source: item?.source,
    status: item?.status,
  })) || [];
  
  return (
    <Box m="20px">
    <Box m="40px 0 0 0" height="80vh">
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={columns}
        sx={{
          // Styling for DataGrid components
          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none",
          },
          "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
            color: "#000",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#000",
          },
          "& .MuiDataGrid-row": {
            color: "#000",
            borderBottom: "1px solid #0000001f!important",
          },
          "& .MuiTablePagination-root": {
            color: "#000",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none!important",
          },
          "& .name-column--cell": {
            color: "#000",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#A4A9FC",
            borderBottom: "none",
            color: "#000",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #0000001f",
          },
          "& .MuiDataGrid-footerContainer": {
            color: "#000",
            borderTop: "none",
            backgroundColor: "#A4A9FC",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius: "5px",
          },
          "& .MuiCheckbox-root": {
            color: `#3462ea !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: "#000!important",
          },
        }}
      />
    </Box>
  </Box>
  )
}

export default SubscribersData
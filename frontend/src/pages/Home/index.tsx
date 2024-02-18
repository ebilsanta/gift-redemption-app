import { Container, Typography } from "@mui/material";
import useHome from "./useHome";
import SearchBar from "../../components/SearchBar/SearchBar";
import PaginatedTable from "../../components/DataTable/DataTable";
import AlertDialog from "../../components/AlertDialog/AlertDialog";
import AlertSnackbar from "../../components/AlertSnackbar/AlertSnackbar";
import LoadButton from "../../components/LoadButton/LoadButton";

function Home() {
  const {
    selectedStaff,
    openDialog,
    openSnackbar,
    setOpenSnackbar,
    snackbarSeverity,
    snackbarMsg,
    handleConfirmClicked,
    handleCancelClicked,
    handleLoadClicked,
    data,
    hasMoreData,
    setSearchQuery,
    handleRedeemClicked,
  } = useHome();
  return (
    <Container sx={{paddingTop: "36px"}}>
      <Typography variant="h4">Gift Redemption</Typography>
      <SearchBar onSearch={setSearchQuery} />
      <PaginatedTable data={data} handleRedeemClicked={handleRedeemClicked} />
      <LoadButton handleLoad={handleLoadClicked} hasMoreData={hasMoreData}/>
      <AlertDialog
        open={openDialog}
        handleCancel={handleCancelClicked}
        handleConfirm={handleConfirmClicked}
        text={`Redemption is for team ${selectedStaff.teamName}. They can only redeem once. Are you sure?`}
        title={`Confirm redemption by ${selectedStaff.staffPassId}`}
      ></AlertDialog>
      <AlertSnackbar
        open={openSnackbar}
        severity={snackbarSeverity}
        message={snackbarMsg}
        setOpen={setOpenSnackbar}
      />
    </Container>
  );
}

export default Home;

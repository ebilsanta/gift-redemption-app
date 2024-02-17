import { useEffect, useState, MouseEvent } from "react";
import staffAPI from "../../api/staffAPI";
import redemptionAPI from "../../api/redemptionAPI";
import { AxiosError } from "axios";

interface SelectedStaff {
  staffPassId: string;
  teamName: string;
}

const useHome = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [data, setData] = useState<Staff[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<SelectedStaff>({
    staffPassId: "",
    teamName: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(false);
  const snackbarSeverity: "error" | "success" = errorMsg ? "error" : "success";
  const snackbarMsg = errorMsg ? errorMsg : successMsg ? successMsg : "";
  const searchCache: Map<string, Staff[]> = new Map();

  const searchForStaff = async (query: string) => {
    if (searchCache.has(query)) {
      setData(searchCache.get(query)!);
      return;
    }
    setHasMoreData(true);
    setPageNum(0);
    try {
      const { data }: { data: Staff[] } = await staffAPI.searchForStaff(
        query.toUpperCase(),
        0,
        10,
        true
      );
      setData(data);
      if (data.length < 10) {
        setHasMoreData(false);
      }
      searchCache.set(query, data);
    } catch (error) {
      const err = error as AxiosError;
      handleErrMsg(err);
    }
  };

  const handleLoadClicked = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      const { data }: { data: Staff[] } = await staffAPI.searchForStaff(
        searchQuery.toUpperCase(),
        pageNum * 10,
        10,
        true
      );
      setData(prev => [...prev, ...data]);
      setPageNum(prev => prev + 1);
      if (data.length < 10) {
        setHasMoreData(false);
      }
      searchCache.set(searchQuery, data);
    } catch (error) {
      const err = error as AxiosError;
      handleErrMsg(err);
    }
  }

  const handleRedeemClicked = async (event: MouseEvent<HTMLButtonElement>) => {
    setErrorMsg("");
    setSuccessMsg("");
    const [staffPassId, teamName] = event.currentTarget.value.split(",");
    setSelectedStaff({ staffPassId, teamName });
    setOpenDialog(true);
  };

  const handleConfirmClicked = async (event: MouseEvent<HTMLButtonElement>) => {
    setOpenDialog(false);
    try {
      await redemptionAPI.redeemGift(selectedStaff.staffPassId);
      setSuccessMsg("Gift redeemed successfully!");
      searchForStaff(searchQuery);
    } catch (error) {
      const err = error as AxiosError;
      handleErrMsg(err);
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCancelClicked = async (event: MouseEvent<HTMLButtonElement>) => {
    setOpenDialog(false);
  };

  const handleErrMsg = (err: AxiosError) => {
    if (err.response?.status === 422 || err.response?.status == 409) {
      const errorObj = err.response?.data as ApiError;
      setErrorMsg(`Error: ${errorObj.error.message}`);
    } else {
      setErrorMsg(`Error: ${err.message}`);
    }
  }

  useEffect(() => {
    if (searchQuery.length === 0){
      searchForStaff("");
    } else if (searchQuery.length >= 4) {
      const timer = setTimeout(() => {
        searchForStaff(searchQuery);
      }, 1500);
  
      return () => clearTimeout(timer);
    }
  }, [searchQuery]);

  return {
    snackbarSeverity,
    snackbarMsg,
    openSnackbar,
    setOpenSnackbar,
    selectedStaff,
    openDialog,
    handleConfirmClicked,
    handleCancelClicked,
    handleLoadClicked,
    hasMoreData,
    data,
    setSearchQuery,
    handleRedeemClicked,
  };
};

export default useHome;

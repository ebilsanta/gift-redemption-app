import axiosInstance from "./axiosInstance";

const staffAPI = {
  searchForStaff: async function (
    prefix: string,
    offset: number,
    limit: number,
    includeRedeemed: boolean
  ) {
    const config = {
      params: {
        prefix,
        offset,
        limit,
        include_redeemed: includeRedeemed,
      },
    };
    return axiosInstance.get("staff", config);
  },
};

export default staffAPI;

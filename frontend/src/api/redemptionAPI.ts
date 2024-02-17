import axiosInstance from "./axiosInstance";

const redemptionAPI = {
  redeemGift: async function (staffPassId: string) {
    const data = { staffPassId };

    return axiosInstance.post("redeem", data);
  },
};

export default redemptionAPI;

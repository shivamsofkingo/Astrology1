import axiosInstance from "./axiosInstance";

export const getAllAstrologers = async () => {
    const response = await axiosInstance.get("/api/admin/astrologers");
    return response.data;
};
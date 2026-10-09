import axiosInstance from "./axiosInstance";

export const getAllAstrologers = async (page = 1, limit = 10, search = "") => {
    const response = await axiosInstance.get("/api/admin/astrologers", {
        params: { page, limit, search },
    });
    return response.data;
};

export const createAstrologer = async (formData) => {
    const response = await axiosInstance.post("/api/admin/astrologers", formData);
    return response.data;
};
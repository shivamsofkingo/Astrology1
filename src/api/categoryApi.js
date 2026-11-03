import axiosInstance from "./axiosInstance";

export const getCategories = async () => {
    const response = await axiosInstance.get("/api/categories");
    return response.data;
};

import axiosInstance from "./axiosInstance";

export const getCategories = async () => {
    const response = await axiosInstance.get("/api/categories");
    return response.data;
};

export const createCategory = async (formData) => {
    const response = await axiosInstance.post('/api/categories', formData);
    return response.data;
};

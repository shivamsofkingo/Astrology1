import axiosInstance from "./axiosInstance";

export const getAllUsers = async () => {
    const response = await axiosInstance.get("/api/admin/users");
    return response.data;
};
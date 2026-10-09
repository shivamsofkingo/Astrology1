import axiosInstance from "./axiosInstance";

export const getAllUsers = async (page = 1, limit = 10, search = "") => {
    const response = await axiosInstance.get(
        "/api/admin/users",
        {
            params: {
                page,
                limit,
                search,
            },
        }
    );
    return response.data;
};
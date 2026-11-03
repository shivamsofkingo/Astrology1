import axiosInstance from './axiosInstance';

export const getAllSubcategories = async () => {
  const response = await axiosInstance.get('/api/subcategories');
  return response.data;
};

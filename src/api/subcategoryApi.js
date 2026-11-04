import axiosInstance from './axiosInstance';

export const getAllSubcategories = async () => {
  const response = await axiosInstance.get('/api/subcategories');
  return response.data;
};

export const createSubcategory = async (subcategory) => {
  const response = await axiosInstance.post('/api/subcategories', subcategory);
  return response.data;
};

export const updateSubcategory = async (subcategoryId, subcategory) => {
  const response = await axiosInstance.patch(`/api/subcategories/${subcategoryId}`, subcategory);
  return response.data;
};
import axios from 'axios';

const API_URL = 'https://cyxwre2bzj.execute-api.sa-east-1.amazonaws.com';

export const getPacientes = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const addItem = async (itemData) => {
  try {
    const response = await axios.put(`${API_URL}/items`, itemData);
    return response.data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

export const updateItem = async (itemId, itemData) => {
  try {
    const response = await axios.put(`${API_URL}/items`, itemData);
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const eliminarPaciente = async (itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
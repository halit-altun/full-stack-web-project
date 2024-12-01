import axios from 'axios';

const API_URL = '/api/products';

const productService = {
  getAllProducts: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
};

export default productService;  
import axios from 'axios';

const productService = {
  getAll: async () => {
    let res = await axios.get(`/api/product`);
    return res.data || [];
  }
}
export default productService;
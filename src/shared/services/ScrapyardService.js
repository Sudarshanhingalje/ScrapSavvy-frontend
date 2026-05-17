import axios from "axios";

const API = "http://localhost:8080/api/scrapyard";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

class ScrapyardService {
  GetMyAllProducts(userId) {
    return axios.get(`${API}/get_my_products/${userId}`, {
      headers: getAuthHeaders(),
    });
  }

  GetAllActiveProducts() {
    return axios.get(`${API}/get_all_products`, {
      headers: getAuthHeaders(),
    });
  }

  AddProduct(userId, data) {
    // data is FormData — axios auto-sets Content-Type with boundary
    return axios.post(`${API}/add_product/${userId}`, data, {
      headers: getAuthHeaders(),
    });
  }

  UpdateProduct(userId, productId, data) {
    return axios.put(`${API}/update_product/${userId}/${productId}`, data, {
      headers: getAuthHeaders(),
    });
  }

  DeleteProduct(userId, productId) {
    return axios.delete(`${API}/delete_product/${userId}/${productId}`, {
      headers: getAuthHeaders(),
    });
  }
}

export default new ScrapyardService();

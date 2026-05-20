import axios from "axios";
import { BASEURL } from "./Utils";

class CustomerService {
  GetProducts(token) {
    const API = BASEURL + "/company/getproducts/";
    return axios.get(API, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetProduct(product_id, token) {
    const API = BASEURL + "/company/getproduct/" + product_id;
    return axios.get(API, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  BuyProduct(product_id, token, formData) {
    const API = BASEURL + "/company/buyproduct/" + product_id;
    return axios.post(API, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new CustomerService();

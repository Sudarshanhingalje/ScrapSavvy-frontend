// import axios from "axios";
// import { BASEURL } from "../shared/utils/Utils";

// class ScrapyardService {
//   AddProduct(userProfileId, formData) {
//     const API = BASEURL + "/scrapyard/add_product/" + userProfileId;
//     return axios.post(API, formData, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }
//   UpdateProduct(userProfileId, formData) {
//     const API = BASEURL + "/scrapyard/product/" + userProfileId;
//     return axios.put(API, formData, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }
//   DeleteProduct(userProfileId, productId) {
//     const API =
//       BASEURL + "/scrapyard/product/" + userProfileId + "/" + productId;
//     return axios.delete(API, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }
//   GetAllProducts(userProfileId) {
//     const API = BASEURL + "/scrapyard/get_all_products/" + userProfileId;
//     return axios.get(API, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }
//   GetMyAllProducts(userProfileId) {
//     const API = BASEURL + "/scrapyard/get_my_products/" + userProfileId;
//     return axios.get(API, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }
//   GetProduct(userProfileId, product_id) {
//     const API =
//       BASEURL + "/scrapyard/get_product/" + userProfileId + "/" + product_id;
//     return axios.get(API, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }
//   BuyProduct(formData) {
//     const API = BASEURL + "/orders/";
//     return axios.post(API, formData, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }
// }

// export default new ScrapyardService();
import api from "./api";

class ScrapyardService {
  AddProduct(userProfileId, formData) {
    return api.post(`/scrapyard/add_product/${userProfileId}`, formData);
  }

  UpdateProduct(userProfileId, formData) {
    return api.put(`/scrapyard/product/${userProfileId}`, formData);
  }

  DeleteProduct(userProfileId, productId) {
    return api.delete(`/scrapyard/product/${userProfileId}/${productId}`);
  }

  GetAllProducts(userProfileId) {
    return api.get(`/scrapyard/get_all_products/${userProfileId}`);
  }

  GetMyAllProducts(userProfileId) {
    return api.get(`/scrapyard/get_my_products/${userProfileId}`);
  }

  GetProduct(userProfileId, productId) {
    return api.get(`/scrapyard/get_product/${userProfileId}/${productId}`);
  }

  BuyProduct(formData) {
    return api.post("/orders", formData);
  }

  /* DASHBOARD */

  GetInventory() {
    return api.get("/inventory");
  }

  GetTransactions() {
    return api.get("/transactions");
  }

  GetOrders() {
    return api.get("/scrap-orders/owner");
  }

  GetPrices(ownerId) {
    return api.get(`/prices/all?ownerId=${ownerId}`);
  }

  UpdatePrices(data) {
    return api.post("/prices/update", data);
  }
}

export default new ScrapyardService();

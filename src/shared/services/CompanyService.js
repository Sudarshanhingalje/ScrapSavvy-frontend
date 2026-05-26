// import axios from "axios";
// import { BASEURL } from "../../shared/utils/Utils";

// class CompanyService {
//   AddProduct(formData) {
//     const API = BASEURL + "/company/addproduct/";
//     return axios.post(API, formData, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }
//   UpdateProduct(userProfileId, formData) {
//     const API = BASEURL + "/company/product/" + userProfileId;
//     return axios.put(API, formData, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }
//   DeleteProduct(userProfileId, productId) {
//     const API = BASEURL + "/company/product/" + userProfileId + "/" + productId;
//     return axios.delete(API, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }
//   GetAllProducts(userProfileId) {
//     const API = BASEURL + "/company/getallproducts/" + userProfileId;
//     return axios.get(API, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }
//   GetProduct(userProfileId, product_id) {
//     const API =
//       BASEURL + "/company/getproduct/" + userProfileId + "/" + product_id;
//     return axios.get(API, {
//       headers: {
//         "Content-Type": "application/json",
//         // 'Authorization': `Bearer ${token}`
//       },
//     });
//   }

//   GetProductCategories() {
//     const API = BASEURL + "/company/getcategories/";
//     return axios.get(API, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }

// export default new CompanyService();

import scrapyardService from "../../../services/scrapyardService";

class ProductService {
  async getProducts(userId) {
    const response = await scrapyardService.GetMyAllProducts(userId);

    return response.data;
  }

  async addProduct(userId, formData) {
    return scrapyardService.AddProduct(userId, formData);
  }

  async updateProduct(userId, formData) {
    return scrapyardService.UpdateProduct(userId, formData);
  }

  async deleteProduct(userId, productId) {
    return scrapyardService.DeleteProduct(userId, productId);
  }
}

export default new ProductService();

import scrapyardService from "../../../shared/services/ScrapyardService";

class ProductService {
  async getProducts(userId) {
    const response = await scrapyardService.GetMyAllProducts(userId);
    return response.data || [];
  }

  async addProduct(userId, formData) {
    const payload = this._buildPayload(formData);
    return scrapyardService.AddProduct(userId, payload);
  }

  async updateProduct(userId, productId, formData) {
    const payload = this._buildPayload(formData);
    return scrapyardService.UpdateProduct(userId, productId, payload);
  }

  async deleteProduct(userId, productId) {
    return scrapyardService.DeleteProduct(userId, productId);
  }

  /* ── Private: builds the full FormData payload from form state ── */
  _buildPayload(formData) {
    const payload = new FormData();

    const num = (val) => (val !== "" && val != null ? Number(val) : null);

    const product = {
      productName: formData.productName,
      brand: formData.brand,
      model: formData.model,
      description: formData.description,
      condition: formData.condition,
      categoryId: num(formData.categoryId),
      subCategory: formData.subCategory,
      price: num(formData.price),
      mrp: num(formData.mrp),
      gst: num(formData.gst),
      quantity: num(formData.quantity),
      minOrderQty: num(formData.minOrderQty) ?? 1,
      maxOrderQty: num(formData.maxOrderQty),
      warranty: formData.warranty || null,
      countryOfOrigin: formData.countryOfOrigin || null,
      weight: num(formData.weight),
      length: num(formData.length),
      width: num(formData.width),
      height: num(formData.height),
      fulfilledBy: formData.fulfilledBy,
      tags: formData.tags || [],
      specifications: JSON.stringify(
        (formData.specifications || []).filter(
          (s) => s.key?.trim() && s.value?.trim(),
        ),
      ),
    };

    payload.append("product", JSON.stringify(product));

    (formData.images || []).forEach((img) => {
      if (img.file) payload.append("images", img.file);
    });

    return payload;
  }
}

export default new ProductService();

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.productName}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-bold">{product.productName}</h2>

        <p className="text-sm text-gray-500 mt-1">{product.description}</p>

        <div className="mt-4 space-y-1">
          <p className="font-semibold">Price: ₹{product.price}</p>

          <p className="text-sm text-gray-600">
            Quantity: {product.quantity} kg
          </p>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-xl"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-600 text-white py-2 rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

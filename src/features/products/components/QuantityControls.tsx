const QuantityControls = ({ product, handleDecrease, handleIncrease }) => {
  return (
    <div className="col-span-2 flex items-center gap-2 mt-2">
      <button
        onClick={() => handleDecrease(product)}
        disabled={product.quantity <= 1}
        className={`px-2 py-1 border rounded ${
          product.quantity <= 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        -
      </button>
      <span className="w-8 text-center">{product.quantity}</span>
      <button
        onClick={() => handleIncrease(product)}
        disabled={product.quantity >= product.stock}
        className={`px-2 py-1 border rounded ${
          product.quantity >= product.stock
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControls;

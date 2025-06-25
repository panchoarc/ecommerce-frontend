const ProductInfo = ({ product }) => {
  return (
    <div className="w-full flex flex-col space-y-2">
      {/* Nombre del producto */}
      <div className="flex flex-col justify-between items-start">
        <h2 className="text-xl break-all line-clamp-3 font-semibold text-gray-800 ">
          {product.name}
        </h2>
      </div>

      <div className="flex flex-row justify-start items-center">
        <p className="text-sm text-gray-600">💲</p>
        <p className="text-md font-medium text-gray-800">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductInfo;

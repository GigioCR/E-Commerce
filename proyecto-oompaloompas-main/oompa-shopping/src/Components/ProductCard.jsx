import { Link } from 'react-router-dom';

const ProductCard = ({ id, imageUrl, title, price, type, onSale, newProduct, stock }) => {
  return (
    <Link to={`/product/${id}`} className="block w-full max-w-[300px]">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-[300px]">
        <div className="relative h-[200px] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {(onSale || newProduct) && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {onSale && <span className="bg-gray-100 text-black px-2 py-1 text-xs font-bold rounded-md">On Sale</span>}
              {newProduct && <span className="bg-gray-100 text-black px-2 py-1 text-xs font-bold rounded-md">New</span>}
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-600">{type}</p>
          </div>
          <p className="text-xl font-bold text-black mt-2">${price.toFixed(2)}</p>
          {stock > 0 ? <p className="text-sm text-gray-600">Stock: {stock}</p> : <p className="text-sm text-red-600">Out of stock</p>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
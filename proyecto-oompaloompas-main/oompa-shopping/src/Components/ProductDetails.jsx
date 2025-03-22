import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ExternalLink, ShoppingCart, Minus, Plus } from 'lucide-react';
import { current_items } from '../constants';

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { id, title, price, description, imageUrl, specifications, type } = product;

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const addToCart = () => {
    const savedItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    if (savedItems[id] == null) {
      savedItems[id] = { ...product, quantity: 0 };
    }
    savedItems[id].quantity += quantity;

    localStorage.setItem('cartItems', JSON.stringify(savedItems));

    reloadCart();
    navigate('/cart');
  };

  const reloadCart = () => {
    let count = 0;
    let total = 0;

    Object.values(current_items).forEach((item) => {
      count += item.quantity;
      total += item.price * item.quantity;
    });

    console.log(`Total items: ${count}, Total price: ${total}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={imageUrl} alt={title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>

        <div>
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-red-500">
                <Heart size={24} />
              </button>
              <button className="text-gray-500 hover:text-blue-500">
                <ExternalLink size={24} />
              </button>
            </div>
          </div>
          <p className="text-xl font-semibold mb-4">${price.toFixed(2)}</p>
          <p className="text-gray-600 mb-2">Category: {type}</p>
          <p className="text-gray-600 mb-6">{description}</p>
          <div className="space-y-4 mb-6">
            <h5>Quantity</h5>
            <div className="flex space-x-4">
              <div className="w-1/3 flex items-center justify-between border border-gray-300 rounded-md">
                <button onClick={decreaseQuantity} className="px-3 py-2 text-gray-600 hover:bg-gray-100">
                  <Minus size={16} />
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button onClick={increaseQuantity} className="px-3 py-2 text-gray-600 hover:bg-gray-100">
                  <Plus size={16} />
                </button>
              </div>
              <button className="w-2/3 bg-black border-2 text-white font-bold py-2 px-4 rounded-lg hover:bg-[#41d2f2] flex items-center justify-center">
                Buy Now
              </button>
            </div>
            <button onClick={addToCart} className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-[#41d2f2] transition duration-300 flex items-center justify-center">
              <ShoppingCart className="inline-block mr-2" size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {specifications && Object.keys(specifications).length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <span className="font-semibold">{key}: </span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
  );
};

export default ProductDetails;
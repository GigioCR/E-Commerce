import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { current_items } from '../constants';
import { useAuth } from '../Components/AuthContext';

const Cart = () => {
  const {user} = useAuth();
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);
  const [showShippingOptions, setShowShippingOptions] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    Object.assign(current_items, savedItems);
    setItems(Object.values(current_items).filter(item => item != null));
  }, []);

  const removeItem = (id) => {
    delete current_items[id];
    localStorage.setItem('cartItems', JSON.stringify(current_items));
    setItems(Object.values(current_items).filter(item => item != null));
  };

  return (
    <div className="container mx-auto p-4 mt-2">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3">
          <div className="text-4xl font-semibold mb-4">Your cart</div>
          <div className="text-base text-gray-600 font-medium mb-4"> Not ready to checkout? <a href="/shopAll" className="text-[#41d2f2] hover:underline">Continue Shopping</a></div>
          <hr className="border-gray-400 mb-4" />
          {items.map(item => (
            <div key={item.id} className="flex mb-4">
              <img
                className="w-[25vw] h-[21vh] border-2 object-crop"
                src={item.imageUrl || 'path/to/default/image.jpg'}
                alt={item.title || 'Product Image'}
              />
              <div className="flex flex-col justify-between ml-4 w-full">
                <div className="flex justify-between items-start">
                  <div className="text-xl font-semibold">{item.title}</div>
                  <button className="text-sm underline" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
                <div className="flex justify-between text-gray-700 items-end">
                  <div className="text-sm font-light">
                    Quantity: {item.quantity} <span className="block font-semibold text-black text-xl mt-1">${item.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <hr className="border-gray-400 mb-4" />
          <div className="flex justify-between items-center mb-4">
            <div className="text-base font-semibold text-gray-600">Return Policy</div>
            <button className="text-l" onClick={() => setShowReturnPolicy(!showReturnPolicy)}>
              {showReturnPolicy ? '-' : '+'}
            </button>
          </div>
          {showReturnPolicy && (
            <div className="text-base text-gray-600 mb-4">This is our example return policy which is everything you need to know about our returns.</div>
          )}
          <hr className="border-gray-400 mb-4" />
          <div className="flex justify-between items-center mb-4">
            <div className="text-base font-semibold text-gray-600">Shipping Options</div>
            <button className="text-l" onClick={() => setShowShippingOptions(!showShippingOptions)}>
              {showShippingOptions ? '-' : '+'}
            </button>
          </div>
          {showShippingOptions && (
            <div className="text-base text-gray-600 mb-4">This is our example return policy which is everything you need to know about our shipping options.</div>
          )}
        </div>
        <div className="w-full lg:w-1/3 lg:pl-8 mt-8 lg:mt-20">
          <div className="text-xl font-semibold mb-4">Order Summary</div>
          <div className="flex justify-between mb-2">
            <div className="text-sm">Subtotal</div>
            <div className="text-sm">${items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="text-sm">Shipping</div>
            <div className="text-sm opacity-70">Calculated at the next step</div>
          </div>
          <hr className="border-gray-400 mb-4" />
          <div className="flex justify-between mb-4">
            <div className="text-sm">Total</div>
            <div className="text-sm">${items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</div>
          </div>
          <Link to="/checkout_address">
            <button className="w-full bg-black text-white py-2 rounded">Continue to checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
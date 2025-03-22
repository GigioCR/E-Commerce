import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { current_items } from "../constants";

const CheckoutAddress = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [shippingPrice, setShippingPrice] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
  });
  const [errors, setErrors] = useState({});

  const removeItem = (id) => {
    delete current_items[id];
    localStorage.setItem("cartItems", JSON.stringify(current_items));
    setItems(Object.values(current_items).filter((item) => item != null));
  };

  const calculateShippingPrice = useCallback(() => {
    if (items.reduce((total, item) => total + item.price * item.quantity, 0) < 3000) {
      setShippingPrice(20);
    } else {
      setShippingPrice(0);
    }
  }, [items]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    Object.assign(current_items, savedItems);
    setItems(Object.values(current_items).filter((item) => item != null));
    calculateShippingPrice();
  }, [calculateShippingPrice]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateForm()) return;

    const shippingAddress = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.country}${formData.zipcode ? `, ${formData.zipcode}` : ''}`;
    localStorage.setItem('shippingAddress', shippingAddress);
    navigate("/checkout_payment");
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4">
          <div className="text-4xl font-semibold mb-4">Checkout</div>
          <div className="YourPaymentDetails w-52 h-8 text-[#252525] text-xl font-bold font-['Public Sans'] leading-7 mb-5">Shipping Information</div>
          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <input
                  className="w-full border border-black p-2"
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
              </div>
              <div className="w-1/2 pl-2">
                <input
                  className="w-full border border-black p-2"
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
              </div>
            </div>
            <div className="mb-4">
              <input
                className="w-full border border-black p-2"
                id="address"
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
            </div>
            <div className="mb-4">
              <input
                className="w-full border border-black p-2"
                id="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />
              {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
            </div>
            <div className="flex mb-4">
              <div className="w-1/3 pr-2">
                <input
                  className="w-full border border-black p-2"
                  id="zipcode"
                  type="text"
                  placeholder="Zipcode"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                />
                {errors.zipcode && <span className="text-red-500 text-sm">{errors.zipcode}</span>}
              </div>
              <div className="w-1/3 px-2">
                <select
                  className="w-full border border-black p-2"
                  id="country"
                  value={formData.country}
                  onChange={handleInputChange}
                >
                  <option value="">Country</option>
                  <option value="Costa Rica">Costa Rica</option>
                  {/* Add more options as needed */}
                </select>
                {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
              </div>
              <div className="w-1/3 pl-2">
                <select
                  className="w-full border border-black p-2"
                  id="state"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="">State</option>
                  <option value="San Jose">San Jose</option>
                  {/* Add more options as needed */}
                </select>
                {errors.state && <span className="text-red-500 text-sm">{errors.state}</span>}
              </div>
            </div>
            <button type="submit" className="w-full bg-[#0d0d0d] text-white py-2 rounded" onClick={handleSubmit}>Continue to payment</button>
          </form>
        </div>

      </div>
      <div className="w-full lg:w-1/2 p-4">
        <div className="text-4xl font-semibold mb-4">Your Cart</div>
        {items.map(item => (
          <div key={item.id}>
            <div className="flex mb-4">
              <img className="w-[25vw] h-[18vh] border-2 object-crop" src={item.imageUrl} alt={item.title} />
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
            <hr className="border-gray-800 mb-2" />
          </div>
        ))}
        <div className="flex justify-between mb-2">
          <div className="text-sm">Subtotal</div>
          <div className="text-sm">${Math.round((items.reduce((total, item) => total + item.price * item.quantity, 0)) * 100) / 100}</div>
        </div>
        <div className="flex justify-between mb-2">
          <div className="text-sm">Shipping</div>
          <div className="text-sm"> ${shippingPrice}</div>
        </div>
        <hr className="border-gray-400 mb-4" />
        <div className="flex justify-between mb-4">
          <div className="text-sm">Total</div>
          <div className="text-sm">${Math.round((items.reduce((total, item) => total + item.price * item.quantity, 0) + shippingPrice) * 100) / 100}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddress;
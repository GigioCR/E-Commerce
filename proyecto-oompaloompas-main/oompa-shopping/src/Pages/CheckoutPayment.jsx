import { current_items, paypal } from "../constants";
import { useEffect, useState, useCallback } from "react";
import { config } from '../config/config';
import axios from 'axios';
import ApprovalMsg from "../Components/ApprovalMsg";
import ErrorMsg from "../Components/ErrorMsg";

const api = axios.create({
  baseURL: config.BACKEND_URL,
});

const CheckoutPayment = () => {
  const [showApprovalMsg, setShowApprovalMsg] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedBank, setSelectedBank] = useState("visa");
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const removeItem = (id) => {
    delete current_items[id];
    const updatedItems = Object.values(current_items).filter(item => item != null);
    localStorage.setItem('cartItems', JSON.stringify(current_items));
    setItems(updatedItems);
    
    const total = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setShippingPrice(total < 3000 ? 20 : 0);
    
    localStorage.removeItem('shippingAddress');
  };


  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    Object.assign(current_items, savedItems);
    const filteredItems = Object.values(current_items).filter(item => item != null);
    setItems(filteredItems);
    
    const total = filteredItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setShippingPrice(total < 3000 ? 20 : 0);
  }, []);

  const validateInputs = () => {
    const newErrors = {};
    if (!cardholderName) newErrors.cardholderName = "Cardholder name is required";
    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) newErrors.cardNumber = "Valid card number is required";
    if (!month || !/^\d{2}$/.test(month) || month < 1 || month > 12) newErrors.month = "Valid month is required";
    if (!year || !/^\d{2}$/.test(year)) newErrors.year = "Valid year is required";
    if (!cvc || !/^\d{3,4}$/.test(cvc)) newErrors.cvc = "Valid CVC is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateInputs()) return;
  
    setPaymentProcessing(true);
    setTimeout(async () => { 
      try {
        const cardValidated = await handleValidateCard();
        if (cardValidated) {
          const orderCreated = await handleCreateOrder(items, shippingPrice, cardNumber);
          if (orderCreated) {
            for (const item of items) {
              removeItem(item.id);
            }
            setPaymentProcessing(false);
            setShowApprovalMsg(true);
          } else {
            setPaymentProcessing(false);
            console.error('Failed to create order');
          }
        } else {
          setPaymentProcessing(false);
          setShowErrorMsg(true)
          console.error('Failed to validate card');
        }
        
      } catch (error) {
        setPaymentProcessing(false);
        console.error('Error in payment process:', error);
      }
    }, 2000); // 2000 milliseconds (2 seconds) delay
  };

  const handleValidateCard = async () => {
    try {
      console.log("mes es: " + month);
      console.log("año es: " + year);
      const cardExpirationDate = `${year}/${month}`;
      console.log("La tarjeta vence el : " + cardExpirationDate);
      console.log("el banco es: " + selectedBank);
      console.log("el número de tarjeta es: " + cardNumber);
      console.log("el cvc es: " + cvc);
      const response = await api.post('/payment/validateCard', {
        cardNumber: cardNumber,
        date: cardExpirationDate,
        cvc: cvc,
        bank: selectedBank,
      });
      console.log("valide la tarjeta")

      if(response.data.success == true) {
        console.log("success papu")
        return true;
      } else {
        console.error("Validation failed:", response.data.message);
        setShowErrorMsg(true);
        return false; 
      }
    } catch (error) {
      console.error('Error validating card:', error);
      return false;
    }
  }

  const handleCreateOrder = async (items, shippingPrice, cardNumber) => {
    try {
      const profile = JSON.parse(localStorage.getItem('profile'));
      const shipping_address = localStorage.getItem('shippingAddress');
      
      const total_amount = Math.round((
        items.reduce((total, item) => total + item.price * item.quantity, 0) + 
        shippingPrice
      ) * 100) / 100;
      console.log(items)
      console.log("profile id: ",profile.id)
      console.log("shipping: ",profile.address)
  
      const response = await api.post('/orders/createOrder', {
        cartItems: items,
        shipping_address: shipping_address,
        user_id: profile.id,
        total_amount: total_amount,
        card_number: cardNumber,
      });
  
      if (response.data.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating order:', error);
      return false;
    }
  };

  return (
    <div className="container mx-auto p-4">

      {showErrorMsg && (
        <ErrorMsg
          message="Invalid card credentials"
          onClose={() => setShowErrorMsg(false)}
        />
      )}
      {showApprovalMsg && (
        <ApprovalMsg
          message="Your payment was successful!"
          onClose={() => setShowApprovalMsg(false)}
        />
      )}
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4">
          <div className="Group1000001772 w-full max-w-md mx-auto p-4 relative">
            <div className="Title text-black text-4xl font-semibold font-['Public Sans'] leading-10">Checkout</div>
            <div className="Group1000001773 w-56 h-7 mt-5 relative">
              <div className="Address left-0 top-0 absolute text-black text-base font-normal font-['Public Sans'] leading-7">Address</div>
              <div className="Line11 w-16 h-px left-[78px] top-[14px] absolute border border-black"></div>
              <div className="Payment left-[160px] top-0 absolute text-black text-base font-bold font-['Public Sans'] leading-7">Payment</div>
            </div>

            <div className="YourPaymentDetails mt-4 text-[#252525] text-xl font-normal font-['Public Sans'] leading-7">Payment Details</div>
              
              
              <label for="banks" className="mt-4">Select a bank:</label>
              <select id="banks" name="banksList" className=" Rectangle w-full h-10 border border-black px-2" onChange={(e) => setSelectedBank(e.target.value)} >
                <option value="visa" selected>Visa</option>
                <option value="masterCard">MasterCard</option>
                <option value="americanExpress">American Express</option>
              </select> 


            <input
              className="Rectangle w-full h-10 mt-4 border border-black px-2"
              placeholder="Cardholder Name"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
            {errors.cardholderName && <div className="text-red-500 text-sm">{errors.cardholderName}</div>}

            <input
              className="Rectangle w-full h-10 mt-4 border border-black px-2"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            {errors.cardNumber && <div className="text-red-500 text-sm">{errors.cardNumber}</div>}

            <div className="flex mt-4 space-x-2">
              <input
                className="Rectangle w-1/3 h-10 border border-black px-2"
                placeholder="Month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              {errors.month && <div className="text-red-500 text-sm">{errors.month}</div>}

              <input
                className="Rectangle w-1/3 h-10 border border-black px-2"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              {errors.year && <div className="text-red-500 text-sm">{errors.year}</div>}

              <input
                className="Rectangle w-1/3 h-10 border border-black px-2"
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
              {errors.cvc && <div className="text-red-500 text-sm">{errors.cvc}</div>}
            </div>

            <div className="flex items-center mt-4">
              <input type="checkbox" className="Rectangle24 w-4 h-4" />
              <label className="SaveCardDataForFuturePayments ml-2 text-black text-sm font-normal font-['Public Sans']">Save card data for future payments</label>
            </div>

            <button
              onClick={handlePayment}
              className={`Base w-full h-12 mt-4 ${paymentProcessing ? 'bg-gray-400' : 'bg-[#0d0d0d]'} text-white text-base font-semibold font-['Public Sans'] leading-snug`}
              disabled={paymentProcessing}
            >
              {paymentProcessing ? "Processing..." : "Pay with card"}
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <div className="text-4xl font-semibold mb-4">Your Cart</div>
          {items.map(item => (
            <div key={item.id}>
              <div className="flex mb-4">
                <img className="w-[25vw] h-[18vh] border-2 object-crop" src={item.imageUrl || 'path/to/default/image.jpg'} alt={item.title} />
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
    </div>
  );
};

export default CheckoutPayment;
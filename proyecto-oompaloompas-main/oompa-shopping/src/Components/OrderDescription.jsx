import React from 'react';
import { ShoppingBasket, Package, Truck, CreditCard, Calendar, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderDescription = ({ order }) => {
  const navigate = useNavigate();

  const OrderInfoItem = ({ icon, label, value }) => (
    <div className="flex items-start space-x-3 py-2">
      <div className="flex-shrink-0 mt-1 rounded-lg p-3 bg-gradient-to-br from-[#41d2f2] to-[#2b8ca1]">
        {icon}
      </div>
      <div className="flex-grow">
        <div className="font-semibold text-gray-700 mt-2">{label}</div>
        <div className="text-gray-600">{value}</div>
      </div>
    </div>
  );

  return (
    <div className="bg-white w-full max-w-[1000px] p-8 rounded-lg shadow-xl mb-36">
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center space-x-2 text-gray-600 hover:text-black mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Orders</span>
      </button>

      <h2 className="text-3xl font-bold font-['Public Sans'] mb-6 text-gray-800">Order Details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
          <OrderInfoItem
            icon={<ShoppingBasket size={24} className="text-white" />}
            label="Order ID"
            value={order.id}
          />
          <OrderInfoItem
            icon={<Calendar size={24} className="text-white" />}
            label="Order Placed"
            value={order.date}
          />
          <OrderInfoItem
            icon={<Package size={24} className="text-white" />}
            label="Status"
            value={order.status}
          />
          <OrderInfoItem
            icon={<Truck size={24} className="text-white" />}
            label="Shipping Address"
            value={order.shippingAddress}
          />
          <OrderInfoItem
            icon={<CreditCard size={24} className="text-white" />}
            label="Payment Method"
            value={order.paymentMethod || 'Not available'}
          />
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Order Summary</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left pb-2 text-gray-600">Item</th>
                <th className="text-right pb-2 text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 text-gray-700">
                    {item.name} x {item.quantity}
                  </td>
                  <td className="text-right py-3 text-gray-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="border-b border-gray-200">
                <td className="py-3 text-gray-600">Subtotal</td>
                <td className="text-right py-3 text-gray-600">
                  ${order.subtotal.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-3 text-gray-600">Shipping</td>
                <td className="text-right py-3 text-gray-600">
                  ${order.shipping.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-lg text-gray-800">Total</td>
                <td className="text-right py-3 font-semibold text-lg text-gray-800">
                  ${order.total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDescription;

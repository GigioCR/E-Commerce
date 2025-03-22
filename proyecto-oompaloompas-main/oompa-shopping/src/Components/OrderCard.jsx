import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket } from 'lucide-react';

const OrderCard = ({ order }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-white w-full max-w-[1000px] p-4 rounded-lg shadow-xl mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="OrderInfo flex items-center space-x-4">
                    <div className="Image w-24 h-24 bg-gradient-to-br from-[#41d2f2] to-[#2b8ca1] flex justify-center items-center text-black text-xl font-semibold font-['Public Sans'] rounded-md">
                        <ShoppingBasket size={30} color='white'/>
                    </div>
                    <div>
                        <div className="OrderPlaced text-xl font-semibold font-['Public Sans']">Order Placed</div>
                        <div className="Date text-base font-semibold font-['Public Sans']">
                            {formatDate(order.created_at)}
                        </div>
                        <div className="Status text-base font-medium text-gray-600">
                            Status: {order.status}
                        </div>
                        <div className="Total text-base font-medium">
                            Total: ${order.total_amount}
                        </div>
                    </div>
                </div>
                
                <div className="AddressSection max-w-[208px]">
                    <div className="Address text-black text-xl font-semibold font-['Public Sans']">Address</div>
                    <div className="AddressInfo opacity-50 text-black text-base font-medium font-['Public Sans'] leading-relaxed">
                        {order.shipping_address}
                    </div>
                </div>

                <Link to={`/order_details/${order.order_id}`}>
                    <button className="w-full md:w-auto px-4 py-2 bg-black text-white text-base font-semibold font-['Public Sans'] rounded hover:bg-gray-800 transition-colors duration-300">
                        View Order Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default OrderCard;
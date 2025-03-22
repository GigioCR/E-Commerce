import React, { useEffect, useState } from 'react';
import OrderCard from '../Components/OrderCard';
import { config } from '../config/config';
import axios from 'axios';

const api = axios.create({
    baseURL: config.BACKEND_URL,
});

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const profile = JSON.parse(localStorage.getItem('profile'));
                const response = await api.get(`/orders/user/${profile.id}`);
                if (response.data.success) {
                    setOrders(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-[1000px]">
            <h1 className="text-black text-4xl font-semibold font-['Public Sans'] mt-20">Orders</h1>
            <div className="w-full h-px bg-black mb-8"></div>
            <div className="space-y-6">
                {loading ? (
                    <div className="text-center">Loading orders...</div>
                ) : orders.length > 0 ? (
                    orders.map((order) => (
                        <OrderCard key={order.order_id} order={order} />
                    ))
                ) : (
                    <div className="text-center text-gray-500">
                        No orders found
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
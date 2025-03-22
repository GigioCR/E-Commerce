import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderDescription from '../Components/OrderDescription';
import { config } from '../config/config';
import axios from 'axios';

const api = axios.create({
  baseURL: config.BACKEND_URL,
});

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { order_id } = useParams(); 

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await api.get(`/orders/${order_id}`);
        if (response.data.success) {
          const orderData = response.data.data;
          if (orderData.card_number) {
            const getCardType = (cardNumber) => {
              const cardTypes = {
                Visa: /^4/,
                Mastercard: /^5[1-5]/,
                Amex: /^3[47]/,
                Discover: /^6(?:011|5)/,
              };
          
              for (const [type, pattern] of Object.entries(cardTypes)) {
                if (pattern.test(cardNumber)) {
                  return type;
                }
              }
          
              return 'Unknown';
            };
          
            const cardType = getCardType(orderData.card_number);
            const last4Digits = orderData.card_number.slice(-4);
          
            orderData.paymentMethod = `${cardType} ending in ${last4Digits}`;
          }
          setOrder(orderData);
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [order_id]);

  if (loading) {
    return <div className='flex items-center justify-center mt-20'>Loading...</div>;
  }

  return (
    <div className='flex items-center justify-center mt-20'>
      {order && <OrderDescription order={order} />}
    </div>
  );
};

export default OrderDetails;

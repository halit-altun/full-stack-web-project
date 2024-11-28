import React, { createContext, useContext, useState } from 'react';
import orderService from '../services/orderService';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = async (cartItems, total, deliveryAddress) => {
    try {
      const orderData = {
        products: cartItems.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: parseFloat(item.price)
        })),
        deliveryAddress: {
          title: deliveryAddress.title,
          fullAddress: deliveryAddress.fullAddress,
          city: deliveryAddress.city,
          district: deliveryAddress.district,
          postalCode: deliveryAddress.postalCode
        },
        totalAmount: total
      };
      
      const response = await orderService.createOrder(orderData);
      setOrders(prevOrders => [response.order, ...prevOrders]);
      return response.order;
    } catch (error) {
      console.error('Order creation error:', error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext); 
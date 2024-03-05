"use client";
import React, { useState, createContext } from 'react'

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (productId) => {
        setCart(prev => [...prev, productId])
    }

    const removeFromCart = (productId) => {
        setCart(cart.filter(product => product._id !== productId));
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}
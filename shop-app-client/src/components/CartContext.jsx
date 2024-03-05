"use client";
import React, { useState, useEffect, createContext } from 'react'

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Get the initial cart from localStorage
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : [];
    });

    // Update localStorage whenever the cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productId) => {
        setCart(prev => [...prev, productId])
    }

    const removeFromCart = (productId) => {
        setCart(cart.filter(product => product._id !== productId));
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}
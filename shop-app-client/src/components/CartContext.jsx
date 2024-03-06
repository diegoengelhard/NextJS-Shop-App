"use client";
import React, { useState, useEffect, createContext } from 'react'

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Get the initial cart from localStorage
        let localCart;
        if (typeof window !== 'undefined') {
            localCart = window.localStorage.getItem('cart');
        }
        return localCart ? JSON.parse(localCart) : [];
    });

    // Update localStorage whenever the cart changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (productId) => {
        setCart(prev => [...prev, productId])
    }

    const removeFromCart = (productId) => {
        setCart(prev => {
            const pos = prev.indexOf(productId);
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        });
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
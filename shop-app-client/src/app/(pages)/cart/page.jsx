"use client";
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/components/CartContext';
import axios from 'axios';

import Header from '@/components/Header/Header';
import Center from '@/components/Center';
import Button from '@/components/Buttons/Button';
import Table from '@/components/Table';
import Input from '@/components/Input';
import { ColumnsWrapper, Box, ProductInfoCell, ProductImageBox, QuantityLabel, CityHolder } from './styles';

const CartPage = () => {
    // Get cart context methods
    const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

    // Set states
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');

    // Fetch products in cart context
    useEffect(() => {
        const fetchCartProducts = async () => {
            if (cart.length > 0) {
                try {
                    const response = await axios.post('/api/cart', { ids: cart });
                    setProducts(response.data);
                    console.log(response.data);
                } catch (error) {
                    console.error('Failed to fetch cart products:', error);
                }
            } else {
                setProducts([]);
            }
        };

        fetchCartProducts();
    }, [cart]);

    // calculate cart total
    let total = 0;
    for (const productId of cart) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    // Create order
    async function goToPayment() {
        try {
            const data = { name, email, city, postalCode, streetAddress, country, cartProducts: cart }
            const response = await axios.post('/api/checkout', data);

            // Redirect to payment page if the response contains a URL
            if (response.data.url) {
                window.location = response.data.url;
            }
        } catch (error) {
            console.error('Failed to create order:', error);
        }
    }

    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {!cart?.length && (
                            <div>Your cart is empty</div>
                        )}
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <ProductInfoCell>
                                                <ProductImageBox>
                                                    <img src={product.photos[0]} alt="" />
                                                </ProductImageBox>
                                                {product.title}
                                            </ProductInfoCell>
                                            <td>
                                                <Button
                                                    onClick={() => removeFromCart(product._id)}
                                                >
                                                    -
                                                </Button>
                                                <QuantityLabel>
                                                    {cart.filter(id => id === product._id).length}
                                                </QuantityLabel>
                                                <Button
                                                    onClick={() => addToCart(product._id)}
                                                >
                                                    +
                                                </Button>
                                            </td>
                                            <td>
                                                ${cart.filter(id => id === product._id).length * product.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>${total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!cart?.length && (
                        <Box>
                            <h2>Order information</h2>
                            <Input type="text"
                                placeholder="Name"
                                value={name}
                                name="name"
                                onChange={ev => setName(ev.target.value)} />
                            <Input type="text"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={ev => setEmail(ev.target.value)} />
                            <CityHolder>
                                <Input type="text"
                                    placeholder="City"
                                    value={city}
                                    name="city"
                                    onChange={ev => setCity(ev.target.value)} />
                                <Input type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    name="postalCode"
                                    onChange={ev => setPostalCode(ev.target.value)} />
                            </CityHolder>
                            <Input type="text"
                                placeholder="Street Address"
                                value={streetAddress}
                                name="streetAddress"
                                onChange={ev => setStreetAddress(ev.target.value)} />
                            <Input type="text"
                                placeholder="Country"
                                value={country}
                                name="country"
                                onChange={ev => setCountry(ev.target.value)} />
                            <Button
                                black block
                                onClick={goToPayment}
                            >
                                Continue to payment
                            </Button>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </>
    )
}

export default CartPage
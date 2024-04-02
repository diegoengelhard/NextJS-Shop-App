"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CartContext } from '@/components/CartContext';
import Link from 'next/link';
import axios from 'axios';

import Header from '@/components/Header/Header';
import Center from '@/components/Center';
import Button from '@/components/Buttons/Button';
import Table from '@/components/Table';
import Input from '@/components/Input';
import { Title, ColumnsWrapper, Box, ProductInfoCell, ProductImageBox, QuantityLabel, CityHolder } from './styles';
import { set } from 'mongoose';

const CartPage = () => {
    // Get session
    const { data: session } = useSession();

    // Get cart context methods
    const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

    // Set states
    const [products, setProducts] = useState([]);
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false); // For showing payment success message
    const [isFailed, setIsFailed] = useState(false); // For showing payment failed message

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
    const goToPayment = async () => {
        try {
            const data = { 
                name: session?.user.name,
                email: session?.user.email,
                city,
                postalCode,
                streetAddress,
                country,
                cartProducts: cart,
                total
            }
            console.log(data);
            const response = await axios.post('/api/checkout', data);

            // Redirect to payment page if the response contains a URL
            if (response.data.url) {
                window.location = response.data.url;
            }
        } catch (error) {
            console.error('Failed to create order:', error);
        }
    }

    // Check if payment is successful
    useEffect(() => {
        // if not, return
        if (typeof window === 'undefined') {
            setIsFailed(true);
            return;
        }
        // if success, clear cart & show success message
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
            clearCart();
        }
    }, []);

    // render success message
    if (isSuccess) {
        return (
            <>
                <Header />
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Thanks for your order!</h1>
                            <p>We will email you when your order will be sent.</p>
                            <Link href="/">Return to home</Link>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        );
    }

    // render failed message
    if (isFailed) {
        return (
            <>
                <Header />
                <Center>
                    <ColumnsWrapper>
                        <Box>
                            <h1>Payment failed</h1>
                            <p>Please try again</p>
                            <Link href="/cart">Return to cart</Link>
                        </Box>
                    </ColumnsWrapper>
                </Center>
            </>
        );
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
                            <Title>
                                <b>name: </b>{session?.user.name}
                            </Title>
                            <Title>
                                <b>email: </b>{session?.user.email}
                            </Title>
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
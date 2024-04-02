"use client";
import React, { useEffect, useState, useContext } from 'react'
import { useSession } from "next-auth/react";
import axios from 'axios';

import Header from '@/components/Header/Header';
import Center from '@/components/Center';
import Spinner from '@/components/Spinner';
import {
    Title,
    SubTitle,
    OrderTitle,
    Box,
    OrderDetails
} from './styles';

const page = () => {
    // Get next-auth session
    const { data: session } = useSession();

    // set states
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // get orders by user email
    useEffect(() => {
        const fetchOrders = async () => {
            const email = session?.user.email;
            try {
                setLoading(true);
                const response = await axios.post('/api/orders', { email });
                setOrders(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

        fetchOrders();
    }, [session]);
    return (
        <>
            <Header />
            <Center>
                {loading ? <Spinner /> : (
                    <>
                        <Title>
                            Welcome, User
                        </Title>
                        <SubTitle>
                            Your orders
                        </SubTitle>
                        {orders.map(order => (
                            <Box key={order._id}>
                                <OrderTitle>
                                    Order ID: #{order._id}
                                </OrderTitle>
                                <OrderDetails>
                                    <div>
                                        <p>{order.name}</p>
                                        <p>{order.email}</p>
                                        <p>{order.country}, {order.city}, {order.postalCode}</p>
                                        <p>Payment status: <b>{order.paid ? 'Yes' : 'No'}</b> </p>
                                    </div>
                                    <div>
                                        <p>${order.total}</p>
                                    </div>
                                </OrderDetails>
                            </Box>
                        ))}
                    </>
                )}
            </Center>
        </>
    )
}

export default page
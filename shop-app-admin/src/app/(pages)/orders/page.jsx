"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Layout from '@/components/Layout';
import Spinner from '@/components/Spinner';

const OrdersPage = () => {
    // Set orders state
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/orders');
                console.log(response);
                setOrders(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

        fetchOrders();
    }, [])

    return (
        <>
            <Layout>
                {loading ? <Spinner/> : (
                    <>
                        <h1>Orders</h1>
                        <table className="basic">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Paid</th>
                                    <th>Recipient</th>
                                    <th>Products</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 && orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{(new Date(order.createdAt)).toLocaleString()}
                                        </td>
                                        <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                                            {order.paid ? 'YES' : 'NO'}
                                        </td>
                                        <td>
                                            {order.name} {order.email}<br />
                                            {order.city} {order.postalCode} {order.country}<br />
                                            {order.streetAddress}
                                        </td>
                                        <td>
                                            {order.line_items.map((l, index) => (
                                                <React.Fragment key={index}>
                                                    {l.price_data?.product_data.name} x
                                                    {l.quantity}<br />
                                                </React.Fragment>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </Layout>
        </>
    )
}

export default OrdersPage
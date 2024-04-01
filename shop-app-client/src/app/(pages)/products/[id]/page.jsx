"use client";
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "next/navigation";
import axios from 'axios';

import Header from '@/components/Header/Header';
import Center from '@/components/Center';
import Spinner from '@/components/Spinner';
import Button from '@/components/Buttons/Button';
import CartIcon from '@/components/Icons/CartIcon';
import { CartContext } from '@/components/CartContext';

import { ColWrapper, PriceRow, Price, WhiteBox, Title } from './styles';

const SingleProductPage = () => {
    const { id } = useParams(); // get params from url
    const { addToCart } = useContext(CartContext); // get addToCart function from context

    // set state product
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    // get product by id
    useEffect(() => {
        const findProductById = async (id) => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/products/${id}`);
                console.log(response.data.product);
                setProduct(response.data.product);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

        findProductById(id)
    }, [id]);

    console.log(product);

    return (
        <>
            <Header />
            <Center>
                {loading ? <Spinner /> : (
                    <Center>
                        <p>Here Product Page</p>
                    </Center>
                )}
            </Center>
        </>
    )
}

export default SingleProductPage
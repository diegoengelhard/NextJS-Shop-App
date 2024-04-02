"use client";
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';

import Header from '@/components/Header/Header';
import ProductsFeed from '@/components/ProductsFeed';
import Center from '@/components/Center';
import ReactPaginate from 'react-paginate';
import Spinner from '@/components/Spinner';

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

const ProductsPage = () => {
    // set states
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/products');
                console.log(response.data);
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

        fetchProducts();
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/categories');
                console.log(response.data);
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

        fetchCategories();
    }, []);

    return (
        <>
            <Header />
            {loading ? <Spinner /> : (
                <>
                    <Center>
                        <Title>Products</Title>
                        <ProductsFeed products={products} categories={categories} />
                    </Center>
                </>
            )}
        </>
    )
}

export default ProductsPage
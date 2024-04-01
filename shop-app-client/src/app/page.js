"use client";
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useSession, signOut, signIn } from "next-auth/react";

import Header from '@/components/Header/Header';
import FeaturedProducts from '@/components/FeaturedProducts/FeaturedProducts';
import ProductsFeed from '@/components/ProductsFeed';
import Center from '@/components/Center';
import Spinner from '@/components/Spinner';

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

export default function Home() {
  // set states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  console.log(session);

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

  // obtain the first product
  const featuredProduct = products[0];

  // obtain last 8 products
  const latestProducts = products.slice(-8);

  return (
    <>
      <Header />
      {(status === "loading" || loading) ? (
        <Spinner />
      ) : (
        <>
          <FeaturedProducts product={featuredProduct} />
          <Center><Title>New Arrivals</Title></Center>
          <ProductsFeed products={latestProducts} />
        </>
      )}
    </>
  )
}

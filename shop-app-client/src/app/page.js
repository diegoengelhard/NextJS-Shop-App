"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'
import styles from './page.module.css'

import Header from '@/components/Header/Header';
import FeaturedProducts from '@/components/FeaturedProducts/FeaturedProducts';

export default function Home() {
  // set states
  const [products, setProducts] = useState([]);
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

  // obtain the first product
  const featuredProduct = products[0];
  console.log('featured product: ', featuredProduct);

  return (
    <>
      <Header />
      {loading ? <p>Loading...</p> : (
        <>
          <FeaturedProducts product={featuredProduct}/>
          <h1>Home</h1>
        </>
      )}
    </>
  )
}

"use client";
import Image from 'next/image'
import styles from './page.module.css'

import Header from '@/components/Header/Header';
import FeaturedProducts from '@/components/FeaturedProducts/FeaturedProducts';

export default function Home() {
  return (
    <>
      <Header />
      <FeaturedProducts />
      <h1>Home</h1>
    </>
  )
}

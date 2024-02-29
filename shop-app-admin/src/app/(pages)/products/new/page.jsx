"use client";
import React from 'react'

import ProductForm from '@/components/ProductForm';
import Layout from '../../../../components/Layout';

const NewProductPage = () => {
    
    return (
        <Layout>
            <h1>Add Product</h1>
            <ProductForm product={null} id={null}/>
        </Layout>
    )
}

export default NewProductPage
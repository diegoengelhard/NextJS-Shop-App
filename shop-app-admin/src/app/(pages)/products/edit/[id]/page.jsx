"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import Layout from "../../../../../components/Layout";
import { toast } from 'react-toastify';
import axios from 'axios';

import ProductForm from '@/components/ProductForm';

const EditProductPage = () => {
    const { id } = useParams(); // get params from url

    // set state product
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    // get product by id
    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/products?id=${id}`); // call api to get product
                setProduct(response.data); // set product state
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
                toast.error('Error getting product.');
            }
        }

        getProduct();
    }, []);

    return (
        <>
            <Layout>
                <h1>Edit product</h1>
                {loading ? <p>Loading...</p> : <ProductForm product={product} id={id} />}
            </Layout>
        </>
    )
}

export default EditProductPage
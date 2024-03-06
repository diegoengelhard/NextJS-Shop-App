"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import Layout from "../../../../../components/Layout";
import { toast } from 'react-toastify';
import axios from 'axios';

import ProductForm from '@/components/ProductForm';
import Spinner from '@/components/Spinner';

const EditProductPage = () => {
    const { id } = useParams(); // get params from url

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
                console.log(error);
            }
        }

        findProductById(id)
    }, [id]);

    return (
        <>
            <Layout>
                <h1>Edit product</h1>
                {loading ? <Spinner/> : <ProductForm product={product} id={id} />}
            </Layout>
        </>
    )
}

export default EditProductPage
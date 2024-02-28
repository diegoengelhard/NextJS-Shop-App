"use client";
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from "next/navigation";
import Layout from "../../../../../components/Layout";
import { toast } from 'react-toastify';
import axios from 'axios';

const EditProductPage = () => {
    const {id} = useParams(); // get params from url
    const router = useRouter(); // mount router
    console.log(id);

    // set state product
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    // get product by id
    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/products?id=${id}`); // call api to get product
                console.log(response.data);
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

    console.log('product', product);
    return (
        <>
            <Layout>
                <h1>Edit product</h1>
            </Layout>
        </>
    )
}

export default EditProductPage
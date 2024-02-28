"use client";
import React, {useEffect, useState} from 'react';
import Layout from '../../../components/Layout';
import Link from "next/link";

const ProductsPage = () => {
    return (
        <>
            <Layout>
                <Link className="bg-gray-300 text-black rounded-md py-1 px-2" href={'/products/new'}>Add new product</Link>
            </Layout>
        </>
    )
}

export default ProductsPage
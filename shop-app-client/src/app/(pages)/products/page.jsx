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
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // calculate products on current page
    const offset = currentPage * itemsPerPage;
    const currentPageData = products.slice(offset, offset + itemsPerPage);

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

    return (
        <>
            <Header />
            {loading ? <Spinner /> : (
                <>
                    <Center>
                        <Title>Products</Title>
                        <ProductsFeed products={products} />
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={Math.ceil(products.length / itemsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={({ selected: selectedPage }) => setCurrentPage(selectedPage)}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </Center>
                </>
            )}
        </>
    )
}

export default ProductsPage
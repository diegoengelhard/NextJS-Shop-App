'use client';
import React, {useState, useEffect} from 'react'
import styled from "styled-components";

import Center from '@/components/Center';
import ProductBox from '@/components/ProductBox/ProductBox'

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const ProductsFeed = ({ products, categories }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;
    return (
        <>
            <Center>
                <select onChange={handleCategoryChange}>
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <StyledProductsGrid>
                    {filteredProducts?.length > 0 && filteredProducts.map(product => (
                        <div key={product._id}>
                            <ProductBox product={product} />
                        </div>
                    ))}
                </StyledProductsGrid>
            </Center>
        </>
    )
}

export default ProductsFeed
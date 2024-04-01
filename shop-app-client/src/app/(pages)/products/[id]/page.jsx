"use client";
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from 'axios';

import Header from '@/components/Header/Header';
import Center from '@/components/Center';
import Spinner from '@/components/Spinner';
import Button from '@/components/Buttons/Button';
import CartIcon from '@/components/Icons/CartIcon';
import { CartContext } from '@/components/CartContext';
import { toast } from 'react-toastify';

import {
    Container,
    WhiteBox,
    ProductName,
    PriceDiscount,
    RoundBlackBtn,
    SliderContainer,
    Flex,
    Carousel,
    ProductInfo,
    ProductImage,
} from './styles';

const SingleProductPage = () => {
    const { data: session } = useSession(); // get session from next-auth
    const { id } = useParams(); // get params from url
    const { addToCart } = useContext(CartContext); // get addToCart function from context

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
                setLoading(false);
                console.log(error);
            }
        }

        findProductById(id)
    }, [id]);

    console.log(product);

    // Add the product to the cart
    const handleAddToCart = () => {
        if (session) {
            addToCart(product);
        } else {
            return toast.warn('Please sign in to add to cart');
        }
    }

    return (
        <>
            <Header />
            <Center>
                {loading ? <Spinner /> : (
                    <Center>
                        <Container>
                            <Flex>
                                {/* Product Images */}
                                <div className="col-md-6">
                                    <SliderContainer>
                                        <div id="slider" className="owl-carousel product-slider">
                                            <div id="slider" className="owl-carousel product-slider">
                                                <WhiteBox>
                                                    <ProductImage src={product?.photos?.[0]} alt="Slider Image 1" />
                                                </WhiteBox>
                                            </div>
                                        </div>
                                    </SliderContainer>
                                </div>

                                {/* Product Info */}
                                <div className="col-md-6">
                                    <div className="product-dtl">
                                        <div className="product-info">
                                            <ProductName>{product?.title}</ProductName>
                                            <PriceDiscount>
                                                <span>${product?.price}</span>
                                            </PriceDiscount>
                                        </div>
                                        <ProductInfo>
                                            {product?.description}
                                        </ProductInfo>
                                        <div className="product-count">
                                            <RoundBlackBtn
                                                onClick={handleAddToCart}
                                            >
                                                Add to Cart
                                            </RoundBlackBtn>
                                        </div>
                                    </div>
                                </div>
                            </Flex>

                            {/* Product Images Carousel */}
                            <Carousel></Carousel>
                        </Container>
                    </Center>
                )}
            </Center>
        </>
    )
}

export default SingleProductPage
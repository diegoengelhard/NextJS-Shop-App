import React, { useContext } from 'react'
import { useSession } from "next-auth/react";
import { CartContext } from '@/components/CartContext';

import Button from "@/components/Buttons/Button";
import CartIcon from "@/components/Icons/CartIcon";
import { ProductWrapper, WhiteBox, Title, ProductInfoBox, PriceRow, Price } from './ProductBox.styles';
import { toast } from 'react-toastify';

const ProductBox = ({ product }) => {
    // Get next-auth session
    const { data: session, status } = useSession();

    const { _id, title, description, price, photos } = product;
    const productUrl = `/products/${_id}`;

    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        if (session) {
            addToCart(product);
        } else {
            return toast.warn('Please sign in to add to cart');
        }
    }

    return (
        <>
            <ProductWrapper>
                <WhiteBox href={productUrl}>
                    <div>
                        <img src={photos?.[0]} alt="" />
                    </div>
                </WhiteBox>
                <ProductInfoBox>
                    <Title href={productUrl}>{title}</Title>
                    <PriceRow>
                        <Price>
                            ${price}
                        </Price>
                        <Button block primary outline onClick={handleAddToCart}>
                            Add to cart
                        </Button>
                    </PriceRow>
                </ProductInfoBox>
            </ProductWrapper>
        </>
    )
}

export default ProductBox
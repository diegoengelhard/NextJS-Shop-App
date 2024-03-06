import React, { useContext } from 'react'
import { CartContext } from '@/components/CartContext';

import Button from "@/components/Buttons/Button";
import CartIcon from "@/components/Icons/CartIcon";
import { ProductWrapper, WhiteBox, Title, ProductInfoBox, PriceRow, Price } from './ProductBox.styles';

const ProductBox = ({ product }) => {
    const { _id, title, description, price, photos } = product;
    const productUrl = `/products/${_id}`;

    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart(_id);
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
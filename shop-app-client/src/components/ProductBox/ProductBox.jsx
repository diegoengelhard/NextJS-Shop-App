import React from 'react'
import Button from "@/components/Buttons/Button";
import CartIcon from "@/components/Icons/CartIcon";
import { ProductWrapper, WhiteBox, Title, ProductInfoBox, PriceRow, Price } from './ProductBox.styles';

const ProductBox = ({ product }) => {
    const { _id, title, description, price, photos } = product;
    const productUrl = `/product/${_id}`;

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
                        <Button block primary outline>
                            Add to cart
                        </Button>
                    </PriceRow>
                </ProductInfoBox>
            </ProductWrapper>
        </>
    )
}

export default ProductBox
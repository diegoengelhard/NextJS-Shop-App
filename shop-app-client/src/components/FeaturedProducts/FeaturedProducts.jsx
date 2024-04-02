import React, {useContext} from 'react';
import { useSession } from "next-auth/react";
import { CartContext } from '@/components/CartContext';

import Center from '../Center'
import Button from '@/components/Buttons/Button'
import ButtonLink from '@/components/Buttons/ButtonLink'
import CartIcon from '@/components/Icons/CartIcon'
import { Bg, Title, Desc, ColumnsWrapper, Column, ButtonsWrapper } from './FeaturedProducts.styles'
import {toast} from 'react-toastify';

const FeaturedProducts = ({ product }) => {
    // Get next-auth session
    const { data: session, status } = useSession();

    // Obtain the addToCart function from the CartContext
    const { addToCart } = useContext(CartContext);

    // Add the product to the cart
    const handleAddToCart = () => {
        if (session) {
            addToCart(product._id);
        } else {
            return toast.warn('Please sign in to add to cart');
        }
    }

    return (
        <>
            <Bg>
                <Center>
                    <ColumnsWrapper>
                        <Column>
                            <div>
                                <Title>{product?.title}</Title>
                                <Desc>{product?.description}</Desc>
                                <ButtonsWrapper>
                                    <ButtonLink href={`/product/${product?._id}`} outline={1} white={1}>Read more</ButtonLink>
                                    <Button $white={true} onClick={handleAddToCart}>
                                        <CartIcon />
                                        Add to cart
                                    </Button>
                                </ButtonsWrapper>
                            </div>
                        </Column>
                        <Column>
                            <img src={product?.photos[0]} alt="" />
                        </Column>
                    </ColumnsWrapper>
                </Center>

            </Bg>
        </>
    )
}

export default FeaturedProducts
import React from 'react'

import Center from '../Center'
import Button from '@/components/Buttons/Button'
import ButtonLink from '@/components/Buttons/ButtonLink'
import CartIcon from '@/components/Icons/CartIcon'
import { Bg, Title, Desc, ColumnsWrapper, Column, ButtonsWrapper } from './FeaturedProducts.styles'

const FeaturedProducts = ({ product }) => {
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
                                    <ButtonLink href={'/product/'} outline={1} white={1}>Read more</ButtonLink>
                                    <Button $white={true}>
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
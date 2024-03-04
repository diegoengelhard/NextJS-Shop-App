import React from 'react'

import Center from '../Center'
import Button from '@/components/Buttons/Button'
import ButtonLink from '@/components/Buttons/ButtonLink'
import CartIcon from '@/components/Icons/CartIcon'
import { Bg, Title, Desc, ColumnsWrapper, Column, ButtonsWrapper } from './FeaturedProducts.styles'

const FeaturedProducts = () => {
    return (
        <>
            <Bg>
                <Center>
                    <ColumnsWrapper>
                        <Column>
                            <div>
                                <Title>Airpods</Title>
                                <Desc>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste ut facilis animi vel iusto fugit labore aperiam autem placeat, recusandae necessitatibus sit deleniti repudiandae hic architecto delectus, eius consequatur voluptates.</Desc>
                                <ButtonsWrapper>
                                    <ButtonLink href={'/product/'} outline={1} white={1}>Read more</ButtonLink>
                                    <Button white >
                                        <CartIcon />
                                        Add to cart
                                    </Button>
                                </ButtonsWrapper>
                            </div>
                        </Column>
                        <Column>
                            <img src="https://dawid-next-ecommerce.s3.amazonaws.com/1679151719649.png" alt="" />
                        </Column>
                    </ColumnsWrapper>
                </Center>

            </Bg>
        </>
    )
}

export default FeaturedProducts
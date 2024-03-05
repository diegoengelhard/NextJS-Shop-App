import React, { useState, useContext } from 'react';
import { CartContext } from '@/components/CartContext';

import Center from '../Center';
import {
    StyledHeader,
    Logo,
    Wrapper,
    StyledNav,
    NavLink,
    NavButton
} from './Header.styles';

const Header = () => {
    const { cart } = useContext(CartContext);

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Ecommerce</Logo>
                    <StyledNav >
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All products</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/account'}>Account</NavLink>
                        <NavLink href={'/cart'}>Cart ({cart.length})</NavLink>
                    </StyledNav>
                    <NavButton>
                        {/* Temp bar icon */}
                        {/* <BarsIcon /> */}
                        <p>Icons</p>
                    </NavButton>
                </Wrapper>
                </Center>
        </StyledHeader>
    )
}

export default Header
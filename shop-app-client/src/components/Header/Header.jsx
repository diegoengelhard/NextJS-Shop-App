import React, { useState, useContext } from 'react';
import { signOut, useSession } from "next-auth/react";
import { CartContext } from '@/components/CartContext';

import Center from '../Center';
import {
    StyledHeader,
    Logo,
    Wrapper,
    StyledNav,
    NavLink,
    NavButton, Logout
} from './Header.styles';

const Header = () => {
    // Get next-auth session
    const { data: session, status } = useSession();

    const { cart } = useContext(CartContext);

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Ecommerce</Logo>
                    <StyledNav >
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/products'}>All products</NavLink>
                        <NavLink href={'/account/sign-in'}>Account</NavLink>
                        {session && (
                            <Logout onClick={() => signOut()}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '1.3rem', height: '1.3rem' }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                            </Logout>
                        )}
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
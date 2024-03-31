import React, { useState } from 'react';
import Logo from './Logo';

import Navbar from './Navbar';

const Layout = ({ children }) => {
    const [showNav, setShowNav] = useState(false);

    return (
        <>
            <div className='bg-primary min-h-screen flex'>
                <Navbar showNavbar={showNav} />
                <section className='bg-white flex-grow my-2 mr-2 rounded-lg p-4'>
                    {children}
                </section>
            </div>
        </>
    )
}

export default Layout
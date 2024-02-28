import React, { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from 'react-toastify';

import Navbar from './Navbar';

const Layout = ({ children }) => {

    return (
        <>
            <div className='bg-purple-500 min-h-screen flex'>
                <Navbar />
                <section className='bg-white flex-grow my-2 mr-2 rounded-lg p-4'>
                    {children}
                </section>
            </div>
        </>
    )
}

export default Layout
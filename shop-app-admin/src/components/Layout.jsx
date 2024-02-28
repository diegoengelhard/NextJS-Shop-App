import React, { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from 'react-toastify';

import Navbar from './Navbar';

const Layout = ({children}) => {
    
    return (
        <>
            <Navbar />
            <section>
                {children}
            </section>
        </>
    )
}

export default Layout
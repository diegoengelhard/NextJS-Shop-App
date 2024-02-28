import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Navbar = () => {
    const inactiveLink = 'flex gap-1 p-1';
    const activeLink = inactiveLink + ' bg-highlight text-black rounded-sm'
    const inactiveIcon = 'w-6 h-6';
    const activeIcon = inactiveIcon + ' text-primary';

    const router = useRouter();
    const { pathname } = router;

    async function logout() {
        await router.push('/');
        await signOut();
    }

    return (
        <>
            <p>navigation</p>
        </>
    )
}

export default Navbar
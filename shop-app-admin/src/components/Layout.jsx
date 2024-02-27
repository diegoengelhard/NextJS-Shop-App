import React, { useState } from 'react'
import LoginForm from './LoginForm';

const Layout = () => {
    const [session, setSession] = useState(false);

    if (session === false) {
        return (
            <LoginForm />
        )
    }
    return (
        <div>Youre Logged in</div>
    )
}

export default Layout
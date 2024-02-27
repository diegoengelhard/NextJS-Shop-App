import React, { useState } from 'react'

const Layout = () => {
    const [session, setSession] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    }

    if (session === false) {
        return (
            <div className="grid place-items-center h-screen">
                <div className="shadow-lg p-5 rounded-lg border-t-4 border-purple-400">
                    <h1 className="text-xl font-bold my-4">Sign In</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Email"
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="**********"
                        />
                        <button className="bg-purple-600 text-white font-bold cursor-pointer px-6 py-2">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <div>Youre Logged in</div>
    )
}

export default Layout
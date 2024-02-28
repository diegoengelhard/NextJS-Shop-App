import React, { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from 'react-toastify';

const Layout = () => {
    const { data: session } = useSession();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            toast.success("Sign In Successful!");
        } catch (error) {
            console.log(error);
        }
    };

    if (!session) {
        return (
            <div className="grid place-items-center h-screen">
                <div className="shadow-lg p-5 rounded-lg border-t-4 border-purple-400">
                    <h1 className="text-xl font-bold my-4">Admin Sign In</h1>

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
        <>
            <div>Youre Logged in</div>
            <button
                onClick={() => signOut()}
                className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
            >
                Log Out
            </button>
        </>
    )
}

export default Layout
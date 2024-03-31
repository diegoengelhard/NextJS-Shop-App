"use client";
import React, { useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import {toast} from 'react-toastify';

const SignInPage = () => {
    const router = useRouter();

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
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-primary">
                <h1 className="text-xl font-bold my-4">Admin Sign In</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="**********"
                    />
                    <button className="bg-primary text-white font-bold cursor-pointer px-6 py-2">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignInPage
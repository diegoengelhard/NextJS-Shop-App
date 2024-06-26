"use client";
import React, { useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import { toast } from 'react-toastify';
import Header from '@/components/Header/Header';
import { Grid, ShadowDiv, Title, Form, Button, Box, Text } from './styles'
import Input from '@/components/Input';

const page = () => {
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
            toast.error(error.response.data.error);
        }
    };

    return (
        <>
            <Header />
            <Grid>
                <ShadowDiv>
                    <Title>Sign In</Title>

                    <Box>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Email"
                        />
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="**********"
                        />
                        <Button
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                    </Box>
                    <Text href="/account/sign-up">Don't have an account? Sign Up</Text>
                </ShadowDiv>
            </Grid>
        </>
    )
}

export default page
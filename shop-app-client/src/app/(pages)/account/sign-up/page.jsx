"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { redirect, useRouter } from "next/navigation";

import { toast } from 'react-toastify';
import Header from '@/components/Header/Header';
import { Grid, ShadowDiv, Title, Form, Button, Box, Text } from './styles'
import Input from '@/components/Input';

const page = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/api/auth/sign-up", {
                name,
                email,
                password,
            });

            toast.success("Sign Up Successful!");
            router.push('/account/sign-in');
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
                    <Title>Sign Up</Title>

                    <Box>
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Name"
                        />
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
                            Sign Up
                        </Button>
                    </Box>
                    <Text href="/account/sign-in">Already have an account? Sign in</Text>
                </ShadowDiv>
            </Grid>
        </>
    )
}

export default page
"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";

import Layout from '../../../components/Layout';
import Spinner from '@/components/Spinner';
import { toast } from "react-toastify";
import Swal from 'sweetalert2'

const page = () => {
    // set states
    const [email, setEmail] = useState('');
    const [adminUsers, setAdminUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch admin users
    useEffect(() => {
        const fetchAdminUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/users');
                console.log(response.data);
                setAdminUsers(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

        fetchAdminUsers();
    }, []);

    // Handle toggle isAdmin
    const handleToggleAdmin = async (email) => {
        try {
            const response = await axios.put('/api/users', { email });
            console.log(response);
            toast.success('User updated successfully');
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error);
            toast.error('Error updating user');
        }
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <Layout>
            <h1>Users</h1>
            <div className='w-2/3'>
                {/* User email input */}
                <label>Search user</label>
                {/* Form to search user & toggle admin status */}
                <form>
                    <div>
                        <input
                            type='email'
                            placeholder='Enter user email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="btn-primary text-sm mb-2"
                            onClick={() => handleToggleAdmin(email)}
                        >
                            Set Admin
                        </button>
                    </div>
                </form>

                {/* Display admin users */}
                {!adminUsers.length > 0 ? (
                    <p>No admin users found</p>
                ) : (
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminUsers.map((user) => (
                                <tr key={user._id}>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2 flex justify-center items-center">
                                        <button
                                            className="btn-red text-sm text-center"
                                            onClick={() => handleToggleAdmin(user.email)}
                                        >
                                            Remove admin
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    )
}

export default page
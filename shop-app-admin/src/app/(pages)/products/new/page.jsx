"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Layout from '../../../../components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewProductPage = () => {
    // mount router
    const router = useRouter();

    // set states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false);

    // save product
    const saveProduct = async (e) => {
        e.preventDefault();
        const product = { title, description, price }; // create product data object
        console.log(product);
        try {
            setLoading(true);
            const response = await axios.post('/api/products', product); // call api to save product
            console.log(response);
            toast.success('Product saved successfully');
            setLoading(false);
            setTimeout(() => {
                router.push('/products');
            }, 1000);
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error('Error saving product.');
        }

    }
    return (
        <Layout>
            <h1>New Product</h1>
            {/* Product form */}
            <form onSubmit={saveProduct} className='w-2/3'>
                <label>Product name</label>
                <input
                    type="text"
                    placeholder="product name"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
                <label>Description</label>
                <textarea
                    placeholder="description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />
                <label>Price (in USD)</label>
                <input
                    type="number" placeholder="price"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}
                />
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
            </form>
        </Layout>
    )
}

export default NewProductPage
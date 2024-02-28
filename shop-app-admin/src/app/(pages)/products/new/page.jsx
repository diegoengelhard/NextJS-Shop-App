"use client";
import React, { useState } from 'react'
import Layout from '../../../../components/Layout';

const NewProductPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const saveProduct = async () => { }
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
                    className="btn-primary">
                    Save
                </button>
            </form>
        </Layout>
    )
}

export default NewProductPage
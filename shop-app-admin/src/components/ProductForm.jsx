import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductForm = ({ product = null, id = null }) => {
    // mount router
    const router = useRouter();

    // set states
    const [title, setTitle] = useState(product ? product[0]?.title : '');
    const [description, setDescription] = useState(product ? product[0]?.description : '');
    const [price, setPrice] = useState(product ? product[0]?.price : '');
    const [loading, setLoading] = useState(false);

    const createProduct = async (product) => {
        setLoading(true);
        const response = await axios.post('/api/products', product); // call api to save product
        console.log(response);
        toast.success('Product saved successfully');
        setLoading(false);
        setTimeout(() => {
            router.push('/products');
        }, 1000);
    }

    const editProduct = async (id, productData) => {
        setLoading(true);
        const response = await axios.put('/api/products', { _id: id, ...productData }); // call api to update product
        console.log(response);
        toast.success('Product updated successfully');
        setLoading(false);
        setTimeout(() => {
            router.push('/products');
        }, 1000);
    }

    // save product
    const saveProduct = async (e) => {
        e.preventDefault();
        const productData = { title, description, price }; // create product data object
        console.log(product);
        try {
            if (id) {
                // edit
                editProduct(id, productData);
            } else {
                // create
                createProduct(productData);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error('Error saving product.');
        }

    }
    return (
        <>
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
        </>
    )
}

export default ProductForm
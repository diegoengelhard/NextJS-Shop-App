import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';

// Import file base for photo upload
import FileBase from 'react-file-base64';

const ProductForm = ({ product = null, id = null }) => {
    // mount router
    const router = useRouter();

    // set states
    const [title, setTitle] = useState(product ? product[0]?.title : '');
    const [description, setDescription] = useState(product ? product[0]?.description : '');
    const [photos, setPhotos] = useState([]);
    const [price, setPrice] = useState(product ? product[0]?.price : '');
    const [loading, setLoading] = useState(false);

    const createProduct = async (productData) => {
        setLoading(true);
        const response = await axios.post('/api/products', productData); // call api to save product
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
        const productData = { title, description, photos, price }; // create product data object
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

    // Image handler
    const handleFileUpload = (result) => {
        const newPhotos = result.filter(file => {
            const fileType = file.type.split('/')[1];
            if (!['jpeg', 'jpg', 'png'].includes(fileType)) {
                toast.error(`File ${file.name} is not a JPEG, JPG, or PNG image and was not uploaded.`);
                return false;
            }
            return true;
        }).map(file => file.base64);

        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    }
    return (
        <>
            {/* Product form */}
            <form onSubmit={saveProduct} className='w-2/3'>
                {/* Product name */}
                <label>Product name</label>
                <input
                    type="text"
                    placeholder="product name"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
                {/* Product desc */}
                <label>Description</label>
                <textarea
                    placeholder="description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />
                {/* Product pics */}
                <div className="mb-2 gap-1">
                    <label>Photos</label>
                    <div className='w-1/3 h-24'>
                        <FileBase
                            type="file"
                            multiple={true}
                            onDone={handleFileUpload}
                        />
                        {photos.length > 0 && photos.map((photo, index) => (
                            <img key={index} src={photo} alt="Uploaded" className="w-32 h-32 object-cover rounded-lg" />
                        ))}
                    </div>
                </div>
                {/* Product price */}
                <label>Price (in USD)</label>
                <input
                    type="number" placeholder="price"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}
                />
                {/* Save button */}
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
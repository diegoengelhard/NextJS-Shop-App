import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';

// Import file base for photo upload
import FileBase from 'react-file-base64';

const ProductForm = ({ product = null, id = null }) => {
    console.log('form', product);
    // mount router
    const router = useRouter();

    // set states
    const [title, setTitle] = useState(product?.title || '');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(product?.category || '' || categories[0]?._id);
    const [properties, setProperties] = useState([]);
    const [selectedValues, setSelectedValues] = useState({});
    const [description, setDescription] = useState(product?.description || '');
    const [photos, setPhotos] = useState(product?.photos || []);
    const [price, setPrice] = useState(product?.price || '');
    const [loading, setLoading] = useState(false);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/categories');
                console.log(response.data);
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

        fetchCategories();
    }, []);

    // Fetch product category properties
    useEffect(() => {
        const selectedCategoryObj = categories.find(category => category._id === selectedCategory);
        if (selectedCategoryObj && selectedCategoryObj.properties) {
            setProperties(selectedCategoryObj.properties);
        } else {
            setProperties([]);
        }
    }, [selectedCategory, categories]);

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

        // create product data object
        const productData = {
            title,
            category: selectedCategory,
            description,
            photos,
            price,
            properties: selectedValues // Add selectedValues to productData
        };
        console.log(productData);
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

    // Property change handler
    const handlePropertyChange = (propertyName, value) => {
        setSelectedValues(prevValues => ({
            ...prevValues,
            [propertyName]: value,
        }));
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    {/* Product form */}
                    <form className='w-2/3'>
                        {/* Product name */}
                        <label>Product name</label>
                        <input
                            type="text"
                            placeholder="product name"
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                        />
                        {/* Product category */}
                        <label>Category</label>
                        <select
                            value={selectedCategory}
                            onChange={ev => setSelectedCategory(ev.target.value)}
                        >
                            <option value="">No category selected</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>

                        {/* Product Category Properties */}
                        <label>Properties</label>
                        {properties.map((property, index) => (
                            <div key={index}>
                                <label>{property.name}</label>
                                <select
                                    value={selectedValues[property.name] || ''}
                                    onChange={ev => handlePropertyChange(property.name, ev.target.value)}
                                >
                                    <option value="">Select {property.name}</option>
                                    {property.values.map((value, index) => (
                                        <option key={index} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {/* Product pics */}
                        <label>Photos</label>
                        <div className="flex mb-2 gap-1">
                            <div className='w-1/3 h-24'>
                                <FileBase
                                    type="file"
                                    multiple={true}
                                    onDone={handleFileUpload}
                                />
                            </div>
                            <div className='flex flex-wrap gap-1'>
                                {photos.length > 0 && photos.map((photo, index) => (
                                    <img key={index} src={photo} alt="Uploaded" className="w-32 h-32 ml-2 object-cover rounded-lg" />
                                ))}
                            </div>
                        </div>
                        {/* Product desc */}
                        <label>Description</label>
                        <textarea
                            placeholder="description"
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                        />
                        {/* Product price */}
                        <label>Price (in USD)</label>
                        <input
                            type="number" placeholder="price"
                            value={price}
                            onChange={ev => setPrice(ev.target.value)}
                        />
                    </form>
                    {/* Save button */}
                    <div className='flex gap-2'>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                            onClick={saveProduct}
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            className="btn-default"
                            onClick={() => router.push('/products')}
                            disabled={loading}
                        >
                            Discard
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductForm
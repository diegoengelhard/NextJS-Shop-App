"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import Layout from '@/components/Layout';

const CategoriesPage = () => {
    // set states
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [editCategory, setEditCategory] = useState(null);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);

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

    // Fetch categories
    useEffect(() => {
        fetchCategories();
    }, []);

    // save category
    const saveCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                name,
                properties: properties.map(p => ({
                    name: p.name,
                    values: p.values.split(','),
                })),
            };
            console.log('form cat data: ', data);

            if (editCategory) {
                // Update category
                const response = await axios.put(`/api/categories/${editCategory._id}`, data);
                console.log(response.data);;
                toast.success('Category updated successfully');
            } else {
                // Create category
                const response = await axios.post('/api/categories', data);
                console.log(response.data);
                toast.success('Category saved successfully');
            }

            setName('');
            setParentCategory('');
            setLoading(false);
            emptyForm();
            fetchCategories();
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error('Error saving category');
        }
    }

    // Update category
    const updateCategory = (category) => {
        setEditCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
        setProperties(
            category.properties.map(({ name, values }) => ({
                name,
                values: values.join(',')
            }))
        );
    }

    // Delete category
    const deleteCategory = (category) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { _id } = category;
                    console.log(_id);
                    setLoading(true);
                    const response = await axios.delete(`/api/categories/${_id}`);
                    console.log(response);
                    setLoading(false);
                    toast.success('Category deleted successfully');
                    fetchCategories();
                } catch (error) {
                    console.log(error);
                    toast.error('Error deleting category');
                }
            }
        });
    }

    // Display property input
    function addProperty() {
        setProperties(prev => {
            return [...prev, { name: '', values: '' }];
        });
    }

    // Handle property input change
    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            // Update property name on array
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        });
    }

    // Handle property values change
    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            // Update property values on array
            const properties = [...prev];
            properties[index].values = newValues;
            return properties;
        });
    }

    // Remove property button
    function removeProperty(indexToRemove) {
        setProperties(prev => {
            // Remove property from array
            return [...prev].filter((p, pIndex) => {
                return pIndex !== indexToRemove;
            });
        });
    }

    // Empty form
    const emptyForm = () => {
        setEditCategory(null);
        setName('');
        setProperties([]);
        setParentCategory('');
    }

    return (
        <>
            <Layout>
                <h1>Categories</h1>
                <div className='w-2/3'>
                    {/* Add Main Category form */}
                    <label>{editCategory ? 'Edit category' : 'Add new category'}</label>
                    <form onSubmit={saveCategory}>
                        <div className="flex gap-1">
                            <input
                                type="text"
                                placeholder='category name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <select
                                onChange={ev => setParentCategory(ev.target.value)}
                                value={parentCategory}>
                                <option value="">No parent category</option>
                                {categories.length > 0 && categories.map(category => (
                                    <option key={category._id} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            {/* Add properties to category */}
                            <label className="block">Properties</label>
                            <button
                                onClick={addProperty}
                                type="button"
                                className="btn-default text-sm mb-2">
                                Add new property
                            </button>
                            {properties.length > 0 && properties.map((property, index) => (
                                <div key={`${property.name}-${index}`} className="flex gap-1 mb-2">
                                    <input type="text"
                                        value={property.name}
                                        className="mb-0"
                                        onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
                                        placeholder="property name (example: color)" />
                                    <input type="text"
                                        value={property.values}
                                        className="mb-0"
                                        onChange={ev => handlePropertyValuesChange(index, property, ev.target.value)}
                                        placeholder="values, comma separated" />
                                    <button
                                        type="button"
                                        className="btn-red"
                                        onClick={() => removeProperty(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Buttons wrapper */}
                        <div className="flex gap-1">
                            {/* Cancel Edit Button */}
                            {editCategory && (
                                <button
                                    type="button"
                                    className="btn-default text-sm mb-2"
                                    onClick={emptyForm}>
                                    Cancel
                                </button>
                            )}

                            {/* Save form button */}
                            <button
                                type="submit"
                                className="btn-primary text-sm mb-2">
                                Save
                            </button>
                        </div>
                    </form>

                    {/* Display categories */}
                    {!editCategory && (
                        loading ? <p>Loading...</p> :
                            <table className="basic mt-4">
                                <thead>
                                    <tr>
                                        <td>Category</td>
                                        <td>Properties</td>
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length > 0 && categories.map(category => (
                                        <tr key={category._id}>
                                            <td>{category.name}</td>
                                            <td>
                                                {category.properties.map(property => property.name).join(', ')}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => updateCategory(category)}
                                                    className="btn-default mr-1"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteCategory(category)}
                                                    className="btn-red"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    )}
                </div>
            </Layout>
        </>
    )
}

export default CategoriesPage
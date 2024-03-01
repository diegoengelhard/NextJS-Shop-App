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
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/categories');
            console.log(response);
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
                parent: parentCategory
            };

            if (editCategory) {
                // Update category
                const response = await axios.put(`/api/categories/${editCategory._id}`, data);
                console.log(response);;
                toast.success('Category updated successfully');
            } else {
                // Create category
                const response = await axios.post('/api/categories', data);
                console.log(response);
                toast.success('Category saved successfully');
            }

            setName('');
            setParentCategory('');
            setLoading(false);
            fetchCategories();
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error('Error saving category');
        }
    }

    const updateCategory = (category) => {
        setEditCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
    }

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
                    const {_id} = category;
                    console.log(_id);
                    const response = await axios.delete(`/api/categories/${_id}`);
                    console.log(response);
                    toast.success('Category deleted successfully');
                    fetchCategories();
                } catch (error) {
                    console.log(error);
                    toast.error('Error deleting category');
                }
            }
        });
    }

    return (
        <>
            <Layout>
                <h1>Categories</h1>
                <div className='w-2/3'>
                    {/* Add Main Category form */}
                    <label>{editCategory ? 'Edit category': 'Add new category'}</label>
                    <form onSubmit={saveCategory} className='flex gap-1'>
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
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="btn-primary text-sm mb-2">
                            Save
                        </button>
                    </form>

                    {/* Display categories */}
                    {loading ? <p>Loading...</p> :
                        <table className="basic mt-4">
                            <thead>
                                <tr>
                                    <td>Category</td>
                                    <td>Sub-Category</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length > 0 && categories.map(category => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>{category?.parent?.name}</td>
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
                        </table>}
                </div>
            </Layout>
        </>
    )
}

export default CategoriesPage
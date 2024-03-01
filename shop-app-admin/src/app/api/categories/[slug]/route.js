import { connect } from '@/config/mongoose';
import Category from '@/models/Category.model';
import { NextRequest, NextResponse } from 'next/server';

connect();

// Update category
export async function PUT(request, { params }) {
    try {
        // get category id from params
        const id = params.slug;

        // verify category exists
        const category = await Category.findOne({ _id: id });
        if (!category) {
            return NextResponse.error(new Error('Category not found'), { status: 404 });
        }

        // get input data
        const { name, parent } = await request.json();

        // verify no empty fields
        if (!name) {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }

        // update category
        const categoryToUpdate = await Category.findOneAndUpdate({ _id: id }, { name, parent }, { new: true });

        // return updated category
        return NextResponse.json({ message: "Category updated successfully" }, categoryToUpdate, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Delete category
export async function DELETE(request, { params }) {
    try {
        // get category id from params
        const id = params.slug;

        // verify category exists
        const category = await Category.findOne({ _id: id });
        if (!category) {
            return NextResponse.error(new Error('Category not found'), { status: 404 });
        }

        // delete category
        await Category.deleteOne({ _id: id });

        // return success message
        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
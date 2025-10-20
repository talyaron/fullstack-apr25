import { Request, Response } from "express";
import { Category, ICategory } from "../model/categoryModel";

export async function getAllCategories(_req: Request, res: Response) {
    try {
        const categories = await ICategory.find();
        if (!categories) {
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server error, in getAllCategories controller function" })
    }
}

export async function addCategory(req: Request, res: Response) {
    try {
        const { name } = req.body  as Category;
        const newCategory = new ICategory({ name });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Server error, in addCategory controller function" })
    }
}

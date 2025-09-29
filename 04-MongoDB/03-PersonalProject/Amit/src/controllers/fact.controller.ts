import { Request, Response } from "express";
import * as factService from "../services/fact.services";

export const getAllFacts = async (req: Request, res: Response) => {
    try {
        const facts = await factService.getAllFacts();

        if (!facts || facts.length === 0) {
            return res.status(404).json({ message: "No facts found" });
        }

        res.status(200).json({ facts });
    } catch (error: any) {
        res.status(500).json({ message: "Error fetching facts", error: error.message });
    }
};

export const getFactById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const fact = await factService.getFactById(id);
        if (!fact) {
            return res.status(404).json({ message: "Fact not found" });
        }
        res.status(200).json({ fact });
    } catch (error: any) {
        res.status(500).json({ message: "Error fetching fact", error: error.message });
    }
};

export const createFact = async (req: Request, res: Response) => {
    try {
        const { title, description, category } = req.body;
        // @ts-ignore
        const userId = req.userId;

        if (!title || !description || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const fact = await factService.createFact(title, description, category, userId);
        res.status(201).json({ fact });
        console.log("Created Fact:", req.body);
    } catch (error: any) {
        res.status(400).json({ message: "Error creating fact", error: error.message });
    }
};

export const updateFact = async (req: Request, res: Response) => {
    try {
        const updated = await factService.updateFact(req.params.id, req.body);
        if (!updated) {
            res.status(404).json({ message: "Fact not found to update please check what's wrong" });
        }
        res.status(200).json({ updated });
    } catch (error) {
        res.status(500).json({ message: "Error updating fact" });
    }
};

export const deleteFact = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // @ts-ignore
        const userId = req.userId;

        const fact = await factService.getFactById(id);
        if (!fact) {
            res.status(404).json({ message: "Fact not found to delete please check what's wrong" });
            return;
        }

        if (fact.userId.toString() !== userId.toString()) {
            res.status(403).json({ message: "You are not authorized to delete this fact" });
            return;
        }

        await factService.deleteFact(id);
        res.status(200).json({ message: "Fact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting fact" });
    }
}
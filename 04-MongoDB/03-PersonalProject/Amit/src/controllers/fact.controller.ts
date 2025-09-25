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
    const newFact = req.body;
    try {
        const createdFact = await factService.createFact(newFact);
        res.status(201).json({ createdFact });
    } catch (error: any) {
        res.status(400).json({ message: "Error creating fact", error: error.message });
    }
};

export const updateFact = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedFact = req.body;
    try {
        const result = await factService.updateFact(id, updatedFact);
        if (!result) {
            res.status(404).json({ message: "Fact not found to update please check what's wrong" });
        }
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: "Error updating fact" });
    }
};

export const deleteFact = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await factService.deleteFact(id);
        if (!result) {
            res.status(404).json({ message: "Fact not found, Can't delete non-existing fact" });
        } else {
            res.status(200).json({ message: "Fact deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting fact" });
    }
}
import { Request, Response } from "express";
import * as factService from "../services/fact.services";

export const getAllFacts = async (req: Request, res: Response) => {
    try {
        const facts = await factService.getAllFacts();
        if (facts) {
            res.status(200).json(facts);
        } else {
            res.status(404).json({ message: "No facts found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching facts" });
    }
};

export const getFactById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const fact = await factService.getFactById(id);
        if (fact) {
            res.status(200).json(fact);
        } else {
            res.status(404).json({ message: "Fact not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching fact" });
    }
};

export const createFact = async (req: Request, res: Response) => {
    const newFact = req.body;
    try {
        const createdFact = await factService.createFact(newFact);
        if (createdFact) {
            res.status(201).json(createdFact);
        } else {
            res.status(400).json({ message: "Error creating fact" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating fact" });
    }
};

export const updateFact = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedFact = req.body;
    try {
        const result = await factService.updateFact(id, updatedFact);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "Fact not found to update please check what's wrong" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating fact" });
    }
};

export const deleteFact = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await factService.deleteFact(id);
        if (result) {
            res.status(200).json({ message: "Fact deleted successfully" });
        } else {
            res.status(404).json({ message: "Fact not found, Can't delete non-existing fact" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting fact" });
    }
}
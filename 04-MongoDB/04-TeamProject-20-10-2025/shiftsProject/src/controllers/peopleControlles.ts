import express, { Request, Response } from "express";
import mongoose from "mongoose";
import People from "../models/people.model";
import { REPLCommand } from "repl";

export const getPeople = async (req:Request,res:Response) =>{
    try {
        
        const people = await People.find ({});
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ message: "Error fetching people", error });

    }
}


export const postPeople = async (req:Request, res:Response)=>{
    try {
        const newPeople = new People(req.body);
        await newPeople.save()
        res.status(201).json(newPeople);
    } catch (error) {
        res.status(500).json({ message: "Error fetching people", error });

    }
}


export const deletePeople = async (req: Request, res: Response) => {
    try {
        // Extract mission id from URL parameters
        const { id } = req.params;
        // Find and delete the Mission document by id
        const deletedPeople = await People.findByIdAndDelete(id);
        if (deletedPeople) {
            res.status(200).json(deletedPeople);
        } else {
            res.status(404).json({ message: "person not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting person", error });
    }
};

export const getAmountOfPeople = async (req:Request,res:Response)=>{
    try {
        
        const amountPeople = await People.countDocuments({})
        res.status(200).json(amountPeople)

    } catch (error) {
        
    }
}


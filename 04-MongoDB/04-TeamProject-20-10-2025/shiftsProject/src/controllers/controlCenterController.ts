import express, { Request, Response } from "express";
import mongoose from "mongoose";
import ControlCenter from "../models/controlCenter.model";

export const getControlCenter = async (req:Request,res:Response) =>{
    try {
        
        const controlCenter = await ControlCenter.find ({});
        res.status(200).json(controlCenter)
    } catch (error) {
        res.status(500).json({ message: "Error fetching controlCenter", error });

    }
}

export const postControlCenter = async (req:Request, res:Response)=>{
    try {
        const newControlCenter = new ControlCenter(req.body);
        await newControlCenter.save()
        res.status(201).json(newControlCenter);
    } catch (error) {
        res.status(500).json({ message: "Error fetching controlCenter", error });

    }
}


export const deleteControlCenter = async (req: Request, res: Response) => {
    try {
        // Extract mission id from URL parameters
        const { id } = req.params;
        // Find and delete the Mission document by id
        const deletedControlCenter = await ControlCenter.findByIdAndDelete(id);
        if (deletedControlCenter) {
            res.status(200).json(deletedControlCenter);
        } else {
            res.status(404).json({ message: "person not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting person", error });
    }
};
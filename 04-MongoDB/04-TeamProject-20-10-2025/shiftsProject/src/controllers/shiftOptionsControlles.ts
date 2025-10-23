import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Shift from "../models/shiftOptions.model";

export const getShiftTypes = async(req:Request,res:Response)=>{

    try {

        const shiftTypes = await Shift.find({});
        res.status(200).json(shiftTypes)
    } catch (error) {
        res.status(500).json({ message: "Error fetching shift types", error });
}}

export const addShiftTypes = async(req:Request,res:Response)=>{

try {
    
    const newShiftType = new Shift (req.body);
    await newShiftType.save()
    res.status(201).json(newShiftType);


} catch (error) {
     res.status(500).json({ message: "Error fetching shift type", error });
}


}

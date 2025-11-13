import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Teams from "../models/teams.model";

export const getTeams = async (req:Request , res : Response)=>{
    try {
        const teams = await Teams.find({});
        res.status(200).json(teams)
    } catch (error) {
        res.status(500).json({ message: "Error fetching teams", error });

    }
}

export const postTeams = async (req:Request, res:Response)=>{
    try {
        const newTeam = new Teams(req.body);
        await newTeam.save()
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(500).json({ message: "Error fetching teams", error });

    }
}



export const deleteTeam = async (req: Request, res: Response) => {
    try {
        // Extract mission id from URL parameters
        const { id } = req.params;
        // Find and delete the Mission document by id
        const deletedTeam = await Teams.findByIdAndDelete(id);
        if (deletedTeam) {
            res.status(200).json(deletedTeam);
        } else {
            res.status(404).json({ message: "Team not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting team", error });
    }
};
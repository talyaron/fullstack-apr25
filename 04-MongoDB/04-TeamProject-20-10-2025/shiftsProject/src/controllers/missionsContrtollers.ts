import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Mission from "../models/missions.model";

export const getMissions = async (req: Request, res: Response) => {
  try {
    // Retrieve all Mission documents (missions)
    const missions = await Mission.find({});
    res.status(200).json(missions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching missions", error });
  }
};

export const postMissions = async (req: Request, res: Response) => {
  try {
    // Create a new Mission document (mission) from request body
    const newMission = new Mission(req.body);
    await newMission.save();
    res.status(201).json(newMission);
  } catch (error) {
    res.status(500).json({ message: "Error creating mission", error });
  }
};

export const deleteMissions = async (req: Request, res: Response) => {
  try {
    // Extract mission id from URL parameters
    const { id } = req.params;
    // Find and delete the Mission document by id
    const deletedMission = await Mission.findByIdAndDelete(id);
    if (deletedMission) {
      res.status(200).json(deletedMission);
    } else {
      res.status(404).json({ message: "Mission not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting mission", error });
  }
};

export const getAmountOfMissions = async (req: Request, res: Response) => {
  try {
    const amountMissions = await Mission.countDocuments({});
    res.status(200).json(amountMissions);
  } catch (error) {}
};
export const getMissionsWaiting = async (req: Request, res: Response) => {
  try {
    const amountWaiting = await Mission.aggregate([
      { $match: { status: "ממתין" } },
      { $count: "totalWaiting" },
    ]);

    const waitingMissions = amountWaiting[0]?.totalWaiting || 0;
    res.status(200).json(waitingMissions);
  } catch (error) {}
};
export const getMissionsDone= async (req: Request, res: Response) => {
  try {
    const amountWaiting = await Mission.aggregate([
      { $match: { status: "בוצע" } },
      { $count: "totalDone" },
    ]);

    const doneMissons = amountWaiting[0]?.totalDone || 0;
    res.status(200).json(doneMissons);
  } catch (error) {}
};

export const patchNewStatus = async (req:Request,res:Response)=>{
  try {

    const { id } = req.params;
    const { status } = req.body;
    const newMission = await  Mission.findByIdAndUpdate(id,{status})
    if (newMission) {
      res.status(200).json(newMission);
    } else {
      res.status(404).json({ message: "Mission not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error update status mission", error });

  }

};

export const getAssignesPeopleAmount = async (req: Request,res: Response) => {
  try {
    const result = await Mission.aggregate([
      { $unwind: "$assignes_people" },
      { $count: "totalPeople" },
    ]);

    const amountPeople = result[0]?.totalPeople || 0;
    res.status(200).json(amountPeople);
  } catch (error) {}
};

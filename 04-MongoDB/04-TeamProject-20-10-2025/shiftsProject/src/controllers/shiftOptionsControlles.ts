import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Shift from "../models/shiftOptions.model";

export const getShiftTypes = async (req: Request, res: Response) => {
  try {
    // שליפת נתונים רק מהשדה shiftType
    const shiftTypes = await Shift.find({}, { _id: 0, shiftType: 1 }).lean();

    // חילוץ הערכים עצמם (ללא עטיפה באובייקטים)
    const types = shiftTypes.map((doc) => doc.shiftType).filter(Boolean);

    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shift types", error });
  }
};

// export const getAssignesPeopleAmount = async (req: Request,res: Response) => {
//   try {
//     const result = await Mission.aggregate([
//       { $unwind: "$assignes_people" },
//       { $count: "totalPeople" },
//     ]);

//     const amountPeople = result[0]?.totalPeople || 0;
//     res.status(200).json(amountPeople);
//   } catch (error) {}
// };

export const addShiftTypes = async(req:Request,res:Response)=>{

try {
    
    const newShiftType = new Shift (req.body);
    await newShiftType.save()
    res.status(201).json(newShiftType);


} catch (error) {
     res.status(500).json({ message: "Error fetching shift type", error });
}


}

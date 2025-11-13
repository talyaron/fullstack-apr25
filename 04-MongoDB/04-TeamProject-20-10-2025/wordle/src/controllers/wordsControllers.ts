import { Request, Response } from "express";
import { wordModel } from "../model/wordModel";

export const getRandomWord = async (_: Request, res: Response) => {
  try {
    const randomWord = await wordModel.aggregate([{ $sample: { size: 1 } }]);
    if (!randomWord || randomWord.length === 0) return res.status(440).json({ message: "Word doesn't exists" });
    res.status(200).json(randomWord);
  } catch {
    res.status(500).json({ message: "Error getting a random word" });
  }
};

export const checkIfExist = async (req: Request, res: Response) => {
  try {
    const { word } = req.body;
    const existing = await wordModel.findOne({ word });
    if (!existing) return res.status(200).json({ exist:false});

    res.status(200).json({exist:true});
  } catch {
    res.status(500).json({ message: "Error in checking if word exist" });
  }
};

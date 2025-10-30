import { Request, Response } from "express";
import { dataModel } from "../model/dataModel";
import { populate } from "dotenv";
export const getUserData = async (req: Request, res: Response) => {
  try {
      const userId = res.locals.userId;

    const data = await dataModel.findOne({ userId });
    console.log("getting data:" , userId)
    if(!data){
      const data = await dataModel.create({userId,amountOfGames:0, amountOfVictories: 0} );
      res.status(201).json({ message: "Userdata added successfully", data });
      return;}
    res.json(data);
  } catch {
    res.status(500).json({ message: "Error fetching data" });
  }
};


export const updateUserData = async (req: Request, res: Response) => {
  try {
      const userId = res.locals.userId;

    const { amountOfGames, amountOfVictories } = req.body;
    const updated = await dataModel.findOneAndUpdate(
      { userId },
      { amountOfGames, amountOfVictories },
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error updating data" });
  }
};

export const getLeaderBoard = async (req: Request, res: Response) => {
  try {
    const data = await dataModel.find().populate("userId", "name").lean();

    const list = data.sort((a, b) => {
      const scoreA = a.amountOfVictories / a.amountOfGames;
      const scoreB = b.amountOfVictories / b.amountOfGames;
      return scoreB - scoreA;
    });
    res.json(list.slice(0, 10));

  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.error("Error fetching leaderboard:", error);
  }
};

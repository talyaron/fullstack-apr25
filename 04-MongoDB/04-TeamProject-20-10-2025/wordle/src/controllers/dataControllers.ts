import { Request, Response } from "express";
import { dataModel } from "../model/dataModel";

export const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const data = await dataModel.findOne({ userId });
    if (!data) {
      const created = await dataModel.create({ userId, amountOfGames: 0, amountOfVictories: 0 });
      return res.status(201).json({ message: "User data created", ...created.toObject() });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

export const updateUserData = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    const { amountOfGames, amountOfVictories } = req.body;
    const updated = await dataModel.findOneAndUpdate(
      { userId },
      { amountOfGames, amountOfVictories },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error updating data" });
  }
};

export const reportResult = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.userId;
    if (!userId) return res.status(401).json({ message: "Not authenticated" });

    const { won } = req.body as { won: boolean };
    const document = await dataModel.findOneAndUpdate(
      { userId },
      { $inc: { amountOfGames: 1, amountOfVictories: won ? 1 : 0 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ ok: true, data: document });
  } catch (error: any) {
    console.error("Error reporting result:", error);
    res.status(500).json({ message: error.message });
  }
};

const BOT_NAMES = ["Adir", "Mati", "Gal", "Yossi", "Einav", "Eti", "Dani", "Omer", "Tomer", "Dana"];

function makeBotRow(name: string) {
  const games = Math.floor(Math.random() * 15) + 3;
  const wins = Math.min(games, Math.floor(games * (0.4 + Math.random() * 0.5)));
  const score = games > 0 ? wins / games : 0;
  return {
    username: `🤖 ${name}`,
    amountOfVictories: wins,
    amountOfGames: games,
    score,
    winRate: Math.round(score * 100),
    _isBot: true,
  };
}

export const getLeaderBoard = async (req: Request, res: Response) => {
  try {
    const players = await dataModel.find().populate("userId", "name").lean();

    const realRows = players.map((p) => {
      const wins = Number(p.amountOfVictories) || 0;
      const games = Number(p.amountOfGames) || 0;
      const score = games > 0 ? wins / games : 0;
      return {
        username: p?.userId && typeof p.userId === "object" ? (p.userId as any).name : "Unknown",
        amountOfVictories: wins,
        amountOfGames: games,
        score,
        winRate: Math.round(score * 100),
      };
    });

    const need = Math.max(0, 10 - realRows.length);
    const botRows = Array.from({ length: need }, (_, i) => makeBotRow(BOT_NAMES[i % BOT_NAMES.length]));

    const leaderboard = [...realRows, ...botRows]
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.amountOfGames - b.amountOfGames;
      })
      .slice(0, 10);

    res.json(leaderboard);
  } catch (error: any) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: error.message });
  }
};

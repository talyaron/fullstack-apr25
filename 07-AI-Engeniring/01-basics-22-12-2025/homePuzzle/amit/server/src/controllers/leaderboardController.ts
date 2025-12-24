import { Request, Response } from 'express';
import User from '../models/User';

export const getLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit = 10 } = req.query;

    // Get top players sorted by score, only completed games
    const leaderboard = await User.find({
      'gameStats.gameCompleted': true
    })
      .select('username score gameStats createdAt')
      .sort({ score: -1 })
      .limit(Number(limit))
      .lean();

    // Format leaderboard data
    const formattedLeaderboard = leaderboard.map((user, index) => ({
      rank: index + 1,
      username: user.username,
      score: user.score,
      ending: user.gameStats?.gameEnding || 'unknown',
      playTime: user.gameStats?.totalPlayTime || 0,
      puzzlesSolved: user.gameStats?.puzzlesSolved || 0,
      completionDate: user.gameStats?.completionDate || user.createdAt
    }));

    res.status(200).json({
      success: true,
      leaderboard: formattedLeaderboard,
      total: formattedLeaderboard.length
    });
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leaderboard'
    });
  }
};

export const getPlayerRank = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Count users with higher scores
    const rank = await User.countDocuments({
      'gameStats.gameCompleted': true,
      score: { $gt: user.score }
    }) + 1;

    // Get total completed games
    const totalPlayers = await User.countDocuments({
      'gameStats.gameCompleted': true
    });

    res.status(200).json({
      success: true,
      rank,
      totalPlayers,
      score: user.score,
      percentile: totalPlayers > 0 ? ((totalPlayers - rank + 1) / totalPlayers * 100).toFixed(1) : 0
    });
  } catch (error: any) {
    console.error('Error fetching player rank:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching rank'
    });
  }
};

export const updateGameCompletion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { finalScore, ending, totalPlayTime, moralityChoices, secretsFound } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Update user with final game stats
    user.score = finalScore;
    user.gameStats.gameCompleted = true;
    user.gameStats.gameEnding = ending;
    user.gameStats.totalPlayTime = totalPlayTime;
    user.gameStats.completionDate = new Date();

    if (moralityChoices) {
      user.gameStats.moralityChoices = moralityChoices;
    }

    if (secretsFound !== undefined) {
      user.gameStats.secretsFound = secretsFound;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Game completion recorded',
      user: {
        username: user.username,
        finalScore: user.score,
        ending: user.gameStats.gameEnding
      }
    });
  } catch (error: any) {
    console.error('Error updating game completion:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating game completion'
    });
  }
};

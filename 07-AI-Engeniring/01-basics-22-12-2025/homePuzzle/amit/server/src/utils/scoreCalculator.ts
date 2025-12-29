/**
 * Score Calculator Utility
 * Formula: Base Points + Time Bonus - Attempt Penalty + Code Elegance Bonus
 */

export interface ScoreCalculationInput {
  basePoints: number;
  timeSpentSeconds: number;
  attemptsUsed: number;
  maxAttempts: number;
  codeLines?: number;
  optimalLines?: number;
}

export interface ScoreResult {
  finalScore: number;
  breakdown: {
    basePoints: number;
    timeBonus: number;
    attemptPenalty: number;
    eleganceBonus: number;
  };
}

/**
 * Calculate final score for a puzzle
 */
export function calculatePuzzleScore(input: ScoreCalculationInput): ScoreResult {
  const { basePoints, timeSpentSeconds, attemptsUsed, codeLines, optimalLines } = input;

  // Base points from puzzle
  const base = basePoints;

  // Time Bonus: Faster completion = more points
  // Max bonus: 50 points for < 60 seconds, decreases over time
  const timeBonus = Math.max(0, Math.floor(50 - (timeSpentSeconds / 60) * 10));

  // Attempt Penalty: Each failed attempt reduces score
  // -10 points per failed attempt
  const failedAttempts = Math.max(0, attemptsUsed - 1);
  const attemptPenalty = failedAttempts * 10;

  // Code Elegance Bonus: Shorter, cleaner code gets bonus
  // Max bonus: 30 points for optimal or better code
  let eleganceBonus = 0;
  if (codeLines && optimalLines) {
    if (codeLines <= optimalLines) {
      eleganceBonus = 30;
    } else if (codeLines <= optimalLines * 1.5) {
      eleganceBonus = 20;
    } else if (codeLines <= optimalLines * 2) {
      eleganceBonus = 10;
    }
  }

  // Calculate final score (never negative)
  const finalScore = Math.max(0, base + timeBonus - attemptPenalty + eleganceBonus);

  return {
    finalScore,
    breakdown: {
      basePoints: base,
      timeBonus,
      attemptPenalty,
      eleganceBonus
    }
  };
}

/**
 * Calculate total game score
 */
export function calculateTotalGameScore(
  puzzleScores: number[],
  totalTimeSeconds: number,
  moralityChoices: { good: number; neutral: number; bad: number },
  secretsFound: number
): ScoreResult {
  // Sum of all puzzle scores
  const puzzleTotal = puzzleScores.reduce((sum, score) => sum + score, 0);

  // Time bonus for overall game completion
  // Bonus for completing under 30 minutes
  const gameTimeMinutes = totalTimeSeconds / 60;
  const gameTimeBonus = gameTimeMinutes < 30 ? 100 : gameTimeMinutes < 60 ? 50 : 0;

  // Morality bonus: Reward good choices
  const moralityBonus = (moralityChoices.good * 20) - (moralityChoices.bad * 10);

  // Secrets bonus: 50 points per secret found
  const secretsBonus = secretsFound * 50;

  const finalScore = puzzleTotal + gameTimeBonus + moralityBonus + secretsBonus;

  return {
    finalScore,
    breakdown: {
      basePoints: puzzleTotal,
      timeBonus: gameTimeBonus,
      attemptPenalty: 0, // Already counted in puzzle scores
      eleganceBonus: moralityBonus + secretsBonus
    }
  };
}

/**
 * Determine game ending based on score and choices
 */
export enum GameEnding {
  HERO = 'hero',
  MARTYR = 'martyr',
  SABOTEUR = 'saboteur'
}

export function determineEnding(
  score: number,
  moralityChoices: { good: number; neutral: number; bad: number },
  secretsFound: number,
  timeSeconds: number
): GameEnding {
  const totalChoices = moralityChoices.good + moralityChoices.neutral + moralityChoices.bad;
  const moralityRatio = totalChoices > 0 ? moralityChoices.good / totalChoices : 0;

  // Saboteur: High bad choices + secrets found
  if (moralityChoices.bad >= 3 && secretsFound >= 2) {
    return GameEnding.SABOTEUR;
  }

  // Martyr: Fast completion + at least 1 sacrifice (bad choice for good reason)
  if (timeSeconds < 1800 && moralityChoices.good >= 2) {
    return GameEnding.MARTYR;
  }

  // Hero: High score + high morality + slow/careful play
  if (score >= 500 && moralityRatio >= 0.7) {
    return GameEnding.HERO;
  }

  // Default to Hero for positive gameplay
  return moralityRatio >= 0.5 ? GameEnding.HERO : GameEnding.SABOTEUR;
}

import { Request, Response } from 'express';
import { VM } from 'vm2';
import Puzzle from '../models/Puzzle';
import User from '../models/User';
import Item from '../models/Item';
import { AuthRequest } from '../middleware/auth';

interface TestResult {
  passed: boolean;
  testCase: string;
  expected: any;
  received: any;
  error?: string;
}

export const getPuzzleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { puzzleId } = req.params;

    const puzzle = await Puzzle.findById(puzzleId).populate('room');

    if (!puzzle) {
      res.status(404).json({
        success: false,
        message: 'Puzzle not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      puzzle: {
        id: puzzle._id,
        title: puzzle.title,
        description: puzzle.problemDescription,
        starterCode: puzzle.starterCode,
        functionName: puzzle.functionName,
        difficulty: puzzle.difficulty,
        points: puzzle.points,
        maxAttempts: puzzle.maxAttempts,
        hints: puzzle.hints,
        rewardItem: puzzle.rewardItem
      }
    });
  } catch (error: any) {
    console.error('Error fetching puzzle:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching puzzle'
    });
  }
};

export const verifyPuzzleSolution = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { puzzleId, code } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
      return;
    }

    if (!code || typeof code !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Code is required'
      });
      return;
    }

    const puzzle = await Puzzle.findById(puzzleId);
    if (!puzzle) {
      res.status(404).json({
        success: false,
        message: 'Puzzle not found'
      });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Check if puzzle is already completed
    if (user.completedPuzzles.includes(puzzleId)) {
      res.status(400).json({
        success: false,
        message: 'Puzzle already completed'
      });
      return;
    }

    // Run code in sandbox and test
    const testResults: TestResult[] = [];
    let allTestsPassed = true;
    let executionError: string | null = null;

    try {
      console.log('=== Puzzle Verification Started ===');
      console.log('Puzzle:', puzzle.title);
      console.log('Function name:', puzzle.functionName);
      console.log('User code:', code);

      // Create a secure VM sandbox
      const vm = new VM({
        timeout: 3000, // 3 second timeout
        sandbox: {
          console: {
            log: () => {}, // Disable console.log
            error: () => {},
            warn: () => {}
          }
        },
        eval: false,
        wasm: false
      });

      // Wrap the user's code and execute
      const wrappedCode = `
        ${code}

        // Export the function so we can test it
        ${puzzle.functionName};
      `;

      console.log('Wrapped code:', wrappedCode);

      // Run the code to get the function
      const userFunction = vm.run(wrappedCode);
      console.log('Function extracted, type:', typeof userFunction);

      // Test each test case
      for (const testCase of puzzle.testCases) {
        try {
          console.log('Testing:', testCase.description, 'with input:', testCase.input);
          const result = userFunction(...testCase.input);
          console.log('Result:', result, 'Expected:', testCase.expectedOutput);
          const passed = JSON.stringify(result) === JSON.stringify(testCase.expectedOutput);
          console.log('Passed:', passed);

          testResults.push({
            passed,
            testCase: testCase.description,
            expected: testCase.expectedOutput,
            received: result
          });

          if (!passed) {
            allTestsPassed = false;
          }
        } catch (error: any) {
          console.error('Test error:', error.message);
          testResults.push({
            passed: false,
            testCase: testCase.description,
            expected: testCase.expectedOutput,
            received: null,
            error: error.message
          });
          allTestsPassed = false;
        }
      }
      console.log('All tests passed:', allTestsPassed);
    } catch (error: any) {
      executionError = error.message;
      allTestsPassed = false;
    }

    // Handle success
    if (allTestsPassed && !executionError) {
      // Create reward item
      let rewardItem = await Item.findOne({ name: puzzle.rewardItem.name });

      if (!rewardItem) {
        rewardItem = await Item.create({
          name: puzzle.rewardItem.name,
          description: puzzle.rewardItem.description
        });
      }

      // Update user
      user.score += puzzle.points;
      user.completedPuzzles.push(puzzleId);
      user.inventory.push(rewardItem._id);
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Puzzle solved successfully!',
        allTestsPassed: true,
        testResults,
        reward: {
          points: puzzle.points,
          item: {
            name: rewardItem.name,
            description: rewardItem.description
          }
        },
        newScore: user.score
      });
      return;
    }

    // Handle failure
    res.status(200).json({
      success: false,
      message: executionError || 'Some tests failed',
      allTestsPassed: false,
      testResults,
      executionError
    });

  } catch (error: any) {
    console.error('Error verifying puzzle solution:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while verifying solution',
      error: error.message
    });
  }
};

export const getPuzzlesByRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId } = req.params;

    const puzzles = await Puzzle.find({ room: roomId });

    res.status(200).json({
      success: true,
      puzzles: puzzles.map(p => ({
        id: p._id,
        title: p.title,
        description: p.problemDescription,
        difficulty: p.difficulty,
        points: p.points
      }))
    });
  } catch (error: any) {
    console.error('Error fetching room puzzles:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching puzzles'
    });
  }
};

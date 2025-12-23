import mongoose, { Schema, Document } from 'mongoose';

export interface ITestCase {
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface IPuzzle extends Document {
  problemDescription: string;
  starterCode: string;
  testCases: ITestCase[];
  rewardItem: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const TestCaseSchema: Schema = new Schema({
  input: {
    type: String,
    required: true
  },
  expectedOutput: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
}, { _id: false });

const PuzzleSchema: Schema = new Schema(
  {
    problemDescription: {
      type: String,
      required: true
    },
    starterCode: {
      type: String,
      required: true,
      default: '// Write your solution here\n'
    },
    testCases: {
      type: [TestCaseSchema],
      required: true,
      validate: {
        validator: function(testCases: ITestCase[]) {
          return testCases && testCases.length > 0;
        },
        message: 'At least one test case is required'
      }
    },
    rewardItem: {
      type: String,
      required: true
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
    points: {
      type: Number,
      default: 100,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPuzzle>('Puzzle', PuzzleSchema);

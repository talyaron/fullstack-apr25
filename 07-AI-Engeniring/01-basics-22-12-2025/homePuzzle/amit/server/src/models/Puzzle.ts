import mongoose, { Schema, Document } from 'mongoose';

export interface ITestCase {
  input: any[];
  expectedOutput: any;
  description: string;
}

export interface IPuzzle extends Document {
  title: string;
  problemDescription: string;
  starterCode: string;
  functionName: string;
  testCases: ITestCase[];
  rewardItem: {
    name: string;
    description: string;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  maxAttempts: number;
  room: mongoose.Types.ObjectId;
  hints?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TestCaseSchema: Schema = new Schema({
  input: {
    type: Schema.Types.Mixed,
    required: true
  },
  expectedOutput: {
    type: Schema.Types.Mixed,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { _id: false });

const PuzzleSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    problemDescription: {
      type: String,
      required: true
    },
    starterCode: {
      type: String,
      required: true,
      default: '// Write your solution here\n'
    },
    functionName: {
      type: String,
      required: true
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
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
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
    },
    maxAttempts: {
      type: Number,
      default: 5
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    hints: [{
      type: String
    }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPuzzle>('Puzzle', PuzzleSchema);

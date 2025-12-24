import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  currentRoom: mongoose.Types.ObjectId;
  score: number;
  inventory: mongoose.Types.ObjectId[];
  completedPuzzles: string[];
  gameStats: {
    totalPlayTime: number;
    puzzlesSolved: number;
    moralityChoices: {
      good: number;
      neutral: number;
      bad: number;
    };
    secretsFound: number;
    gameEnding?: 'hero' | 'martyr' | 'saboteur';
    gameCompleted: boolean;
    completionDate?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20
    },
    currentRoom: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      default: null
    },
    score: {
      type: Number,
      default: 0,
      min: 0
    },
    inventory: [{
      type: Schema.Types.ObjectId,
      ref: 'Item'
    }],
    completedPuzzles: [{
      type: String
    }],
    gameStats: {
      totalPlayTime: {
        type: Number,
        default: 0
      },
      puzzlesSolved: {
        type: Number,
        default: 0
      },
      moralityChoices: {
        good: { type: Number, default: 0 },
        neutral: { type: Number, default: 0 },
        bad: { type: Number, default: 0 }
      },
      secretsFound: {
        type: Number,
        default: 0
      },
      gameEnding: {
        type: String,
        enum: ['hero', 'martyr', 'saboteur'],
        default: undefined
      },
      gameCompleted: {
        type: Boolean,
        default: false
      },
      completionDate: {
        type: Date,
        default: undefined
      }
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', UserSchema);

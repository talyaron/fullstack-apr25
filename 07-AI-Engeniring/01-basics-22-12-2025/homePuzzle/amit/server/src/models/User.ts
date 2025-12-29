import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  currentRoom: mongoose.Types.ObjectId;
  score: number;
  inventory: mongoose.Types.ObjectId[];
  completedPuzzles: string[];
  settings: {
    audio: {
      soundEffects: boolean;
      backgroundMusic: boolean;
      volume: number;
    };
    display: {
      scanlineEffect: boolean;
      terminalFontSize: 'small' | 'medium' | 'large';
    };
    gameplay: {
      showHints: boolean;
      autoSave: boolean;
    };
  };
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
    settings: {
      audio: {
        soundEffects: {
          type: Boolean,
          default: true
        },
        backgroundMusic: {
          type: Boolean,
          default: true
        },
        volume: {
          type: Number,
          default: 70,
          min: 0,
          max: 100
        }
      },
      display: {
        scanlineEffect: {
          type: Boolean,
          default: true
        },
        terminalFontSize: {
          type: String,
          enum: ['small', 'medium', 'large'],
          default: 'medium'
        }
      },
      gameplay: {
        showHints: {
          type: Boolean,
          default: true
        },
        autoSave: {
          type: Boolean,
          default: true
        }
      }
    },
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

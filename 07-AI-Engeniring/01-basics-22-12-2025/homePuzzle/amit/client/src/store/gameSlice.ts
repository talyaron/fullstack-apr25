import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Item {
  _id: string;
  name: string;
  description?: string;
}

export interface Room {
  _id: string;
  title: string;
  description: string;
  imageAsset: string;
  connections: {
    [key: string]: string;
  };
  puzzles: string[];
}

export interface Settings {
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
}

export interface PlayerState {
  id: string | null;
  username: string | null;
  currentRoom: Room | null;
  currentRoomData: Room | null;
  discoveredRooms: Room[];
  score: number;
  inventory: Item[];
  completedPuzzles: string[];
  settings: Settings;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: PlayerState = {
  id: null,
  username: null,
  currentRoom: null,
  currentRoomData: null, // Changed from hardcoded object to null
  discoveredRooms: [],
  score: 0,
  inventory: [],
  completedPuzzles: [],
  settings: {
    audio: {
      soundEffects: true,
      backgroundMusic: true,
      volume: 70
    },
    display: {
      scanlineEffect: true,
      terminalFontSize: 'medium'
    },
    gameplay: {
      showHints: true,
      autoSave: true
    }
  },
  isAuthenticated: false,
  token: localStorage.getItem('stationZeroToken') || null
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Partial<PlayerState>>) => {
      return { ...state, ...action.payload };
    },
    setAuthentication: (state, action: PayloadAction<{ token: string; username: string; id: string }>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.isAuthenticated = true;
      localStorage.setItem('stationZeroToken', action.payload.token);
    },
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.currentRoom = null;
      state.score = 0;
      state.inventory = [];
      state.completedPuzzles = [];
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('stationZeroToken');
    },
    setCurrentRoom: (state, action: PayloadAction<Room>) => {
      state.currentRoom = action.payload;
    },
    addToInventory: (state, action: PayloadAction<Item>) => {
      state.inventory.push(action.payload);
    },
    removeFromInventory: (state, action: PayloadAction<string>) => {
      state.inventory = state.inventory.filter(item => item._id !== action.payload);
    },
    addCompletedPuzzle: (state, action: PayloadAction<string>) => {
      if (!state.completedPuzzles.includes(action.payload)) {
        state.completedPuzzles.push(action.payload);
      }
    },
    updateScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    resetGame: (state) => {
      state.currentRoom = null;
      state.score = 0;
      state.inventory = [];
      state.completedPuzzles = [];
    },
    setCurrentRoomData: (state, action: PayloadAction<Room>) => {
      state.currentRoomData = action.payload;
      if (!state.discoveredRooms.find(r => r._id === action.payload._id)) {
        state.discoveredRooms.push(action.payload);
      }
    },
    updateSettings: (state, action: PayloadAction<Partial<Settings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    updateAudioSettings: (state, action: PayloadAction<Partial<Settings['audio']>>) => {
      state.settings.audio = { ...state.settings.audio, ...action.payload };
    },
    updateDisplaySettings: (state, action: PayloadAction<Partial<Settings['display']>>) => {
      state.settings.display = { ...state.settings.display, ...action.payload };
    },
    updateGameplaySettings: (state, action: PayloadAction<Partial<Settings['gameplay']>>) => {
      state.settings.gameplay = { ...state.settings.gameplay, ...action.payload };
    }
  }
});

export const {
  setPlayer,
  setAuthentication,
  logout,
  setCurrentRoom,
  addToInventory,
  removeFromInventory,
  addCompletedPuzzle,
  updateScore,
  resetGame,
  setCurrentRoomData,
  updateSettings,
  updateAudioSettings,
  updateDisplaySettings,
  updateGameplaySettings
} = gameSlice.actions;

export default gameSlice.reducer;

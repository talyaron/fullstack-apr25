# Step 2 Implementation Guide - Game Layout & Room Navigation

## ✅ Completed So Far

1. ✅ SCSS Variables Module (_variables.module.scss) - Complete terminal theme
2. ✅ Global SCSS Module (Global.module.scss) - Reset & base styling
3. ✅ Modal Component - Reusable modal with animations
4. ✅ Header Component - Player info, score, settings button
5. ✅ useTypewriter Hook - Typewriter effect for descriptions

## 📋 Remaining Implementation Steps

### Frontend Components

#### 1. RoomView Component
**File**: `client/src/components/game/RoomView.tsx`

```typescript
import { motion } from 'framer-motion';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useAppSelector } from '../../store/hooks';
import styles from './RoomView.module.scss';

const RoomView = () => {
  const { currentRoomData } = useAppSelector((state) => state.game);
  const { displayText } = useTypewriter({
    text: currentRoomData?.description || '',
    speed: 30
  });

  if (!currentRoomData) {
    return <div className={styles.loading}>Loading room...</div>;
  }

  return (
    <motion.div
      className={styles.roomView}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.roomHeader}>
        <h1 className={styles.roomTitle}>{currentRoomData.title}</h1>
      </div>

      <div className={styles.roomContent}>
        <p className={styles.description}>{displayText}<span className={styles.cursor}>_</span></p>

        {/* Interactive Area */}
        <div className={styles.interactiveArea}>
          <h3>Interactive Objects</h3>
          <div className={styles.objects}>
            {/* Placeholder for future objects */}
            <p className={styles.placeholder}>No interactive objects in this room yet.</p>
          </div>
        </div>

        {/* Connections/Exits */}
        {currentRoomData.connections && Object.keys(currentRoomData.connections).length > 0 && (
          <div className={styles.exits}>
            <h4>Exits:</h4>
            <div className={styles.exitButtons}>
              {Object.entries(currentRoomData.connections).map(([direction, roomId]) => (
                <button
                  key={direction}
                  className={styles.exitButton}
                  onClick={() => handleMove(roomId)}
                >
                  {direction.toUpperCase()} →
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RoomView;
```

**SCSS**: `RoomView.module.scss`
```scss
@import '../../styles/variables.module';

.roomView {
  flex: 1;
  padding: var(--spacing-xl);
  overflow-y: auto;
}

.roomHeader {
  margin-bottom: var(--spacing-xl);
}

.roomTitle {
  @include terminal-text;
  font-size: var(--font-size-3xl);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-shadow: 0 0 15px var(--primary-green-glow);
}

.roomContent {
  @include panel-style;
  padding: var(--spacing-xl);
}

.description {
  @include terminal-text;
  font-size: var(--font-size-lg);
  line-height: 1.8;
  margin-bottom: var(--spacing-2xl);
}

.cursor {
  @include cursor-blink;
  color: var(--primary-green);
}

.interactiveArea {
  margin-top: var(--spacing-2xl);
  padding: var(--spacing-lg);
  background: var(--bg-darker);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);

  h3 {
    color: var(--text-terminal);
    margin-bottom: var(--spacing-md);
  }
}

.exits {
  margin-top: var(--spacing-xl);

  h4 {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
    font-size: var(--font-size-sm);
  }
}

.exitButtons {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.exitButton {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--bg-panel);
  border: 2px solid var(--border-terminal);
  border-radius: var(--radius-sm);
  color: var(--text-terminal);
  font-family: var(--font-main);
  font-weight: bold;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background: var(--primary-green);
    color: var(--bg-dark);
    box-shadow: var(--shadow-glow-green);
    transform: translateX(5px);
  }
}
```

#### 2. InventoryBar Component
**File**: `client/src/components/game/InventoryBar.tsx`

```typescript
import { useAppSelector } from '../../store/hooks';
import styles from './InventoryBar.module.scss';

const InventoryBar = () => {
  const { inventory } = useAppSelector((state) => state.game);
  const slots = Array(6).fill(null);

  return (
    <div className={styles.inventoryBar}>
      <div className={styles.label}>INVENTORY</div>
      <div className={styles.slots}>
        {slots.map((_, index) => {
          const item = inventory[index];
          return (
            <div
              key={index}
              className={`${styles.slot} ${item ? styles.filled : styles.empty}`}
            >
              {item ? (
                <div className={styles.item}>
                  <span className={styles.itemName}>{item.name}</span>
                </div>
              ) : (
                <span className={styles.slotNumber}>{index + 1}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InventoryBar;
```

**SCSS**: `InventoryBar.module.scss`
```scss
@import '../../styles/variables.module';

.inventoryBar {
  height: var(--inventory-bar-height);
  background: var(--bg-panel);
  border-top: 2px solid var(--border-terminal);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-xl);
  gap: var(--spacing-lg);
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.5), 0 0 20px var(--primary-green-glow);
  position: relative;
  z-index: var(--z-sticky);
}

.label {
  @include terminal-text;
  font-size: var(--font-size-sm);
  font-weight: bold;
  letter-spacing: 0.15em;
}

.slots {
  display: flex;
  gap: var(--spacing-md);
  flex: 1;
}

.slot {
  width: 80px;
  height: 60px;
  border: 2px solid var(--border-default);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
  position: relative;

  &.empty {
    background: var(--bg-darker);
    border-style: dashed;

    .slotNumber {
      color: var(--text-muted);
      font-size: var(--font-size-xs);
    }
  }

  &.filled {
    background: var(--bg-panel-hover);
    border-color: var(--border-terminal);
    box-shadow: var(--shadow-glow-green);

    &:hover {
      transform: translateY(-2px);
      border-color: var(--primary-green-light);
    }
  }
}

.item {
  text-align: center;
}

.itemName {
  color: var(--text-terminal);
  font-size: var(--font-size-xs);
  font-weight: bold;
}
```

#### 3. MapOverlay Component
**File**: `client/src/components/game/MapOverlay.tsx`

```typescript
import { useState } from 'react';
import { FaMap } from 'react-icons/fa';
import Modal from '../ui/Modal';
import { useAppSelector } from '../../store/hooks';
import styles from './MapOverlay.module.scss';

const MapOverlay = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { discoveredRooms } = useAppSelector((state) => state.game);

  return (
    <>
      <button
        className={styles.mapButton}
        onClick={() => setIsMapOpen(true)}
        aria-label="Open map"
      >
        <FaMap className={styles.icon} />
        <span>MAP</span>
      </button>

      <Modal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        title="Station Map"
        width="800px"
      >
        <div className={styles.mapContent}>
          <div className={styles.mapGrid}>
            {discoveredRooms && discoveredRooms.length > 0 ? (
              discoveredRooms.map((room) => (
                <div key={room._id} className={styles.mapRoom}>
                  <div className={styles.roomIcon}>📍</div>
                  <div className={styles.roomInfo}>
                    <div className={styles.roomName}>{room.title}</div>
                    <div className={styles.roomStatus}>Discovered</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noRooms}>
                <p>No rooms discovered yet. Start exploring!</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MapOverlay;
```

#### 4. GameContainer Component
**File**: `client/src/components/game/GameContainer.tsx`

```typescript
import Header from './Header';
import RoomView from './RoomView';
import InventoryBar from './InventoryBar';
import MapOverlay from './MapOverlay';
import styles from './GameContainer.module.scss';

const GameContainer = () => {
  return (
    <div className={styles.gameContainer}>
      <Header />

      <div className={styles.mainContent}>
        <RoomView />
        <MapOverlay />
      </div>

      <InventoryBar />
    </div>
  );
};

export default GameContainer;
```

**SCSS**: `GameContainer.module.scss`
```scss
@import '../../styles/variables.module';

.gameContainer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-dark);
}

.mainContent {
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
}
```

### Backend Implementation

#### 1. Room Controller
**File**: `server/src/controllers/roomController.ts`

```typescript
import { Request, Response } from 'express';
import Room from '../models/Room';
import { AuthRequest } from '../middleware/auth';

export const getRoomById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const room = await Room.findById(id).populate('puzzles').exec();

    if (!room) {
      res.status(404).json({
        success: false,
        message: 'Room not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      room: {
        _id: room._id,
        title: room.title,
        description: room.description,
        imageAsset: room.imageAsset,
        connections: room.connections,
        puzzles: room.puzzles
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching room data'
    });
  }
};

export const movePlayer = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { roomId } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
      return;
    }

    const room = await Room.findById(roomId);
    if (!room) {
      res.status(404).json({
        success: false,
        message: 'Room not found'
      });
      return;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { currentRoom: roomId },
      { new: true }
    ).populate('currentRoom').exec();

    res.status(200).json({
      success: true,
      user: {
        currentRoom: user.currentRoom
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error moving player'
    });
  }
};
```

#### 2. Room Routes
**File**: `server/src/routes/roomRoutes.ts`

```typescript
import { Router } from 'express';
import { getRoomById, movePlayer } from '../controllers/roomController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/:id', authenticate, getRoomById);
router.post('/move', authenticate, movePlayer);

export default router;
```

#### 3. Update server.ts
Add room routes to `server/src/server.ts`:

```typescript
import roomRoutes from './routes/roomRoutes';

// Add after authRoutes
app.use('/api/rooms', roomRoutes);
```

### Redux Updates

#### Expand gameSlice
**File**: `client/src/store/gameSlice.ts`

Add to the interface and state:

```typescript
export interface RoomData {
  _id: string;
  title: string;
  description: string;
  imageAsset: string;
  connections: {
    [key: string]: string;
  };
  puzzles: string[];
}

export interface PlayerState {
  // ... existing fields
  currentRoomData: RoomData | null;
  discoveredRooms: RoomData[];
  isLoadingRoom: boolean;
}

// Add to reducers:
setCurrentRoomData: (state, action: PayloadAction<RoomData>) => {
  state.currentRoomData = action.payload;
  if (!state.discoveredRooms.find(r => r._id === action.payload._id)) {
    state.discoveredRooms.push(action.payload);
  }
},
setLoadingRoom: (state, action: PayloadAction<boolean>) => {
  state.isLoadingRoom = action.payload;
}
```

#### Setup RTK Query (Optional Advanced)
Or simply use async thunks with the existing API service.

## Testing Checklist

- [ ] Header displays username and score correctly
- [ ] Settings modal opens and closes
- [ ] Room description has typewriter effect
- [ ] Inventory bar shows 6 slots
- [ ] Map button opens modal
- [ ] Room navigation works (if you create seed data)
- [ ] currentRoom updates in database
- [ ] Discovered rooms accumulate
- [ ] Framer Motion transitions work smoothly

## Next Steps After Step 2

1. Create seed data for rooms
2. Implement puzzle system
3. Add code editor for puzzle solving
4. Implement vm2 code execution
5. Add sound effects and music
6. Create more rooms and puzzles

---

**All components follow the Station Zero terminal theme with green accents and dark backgrounds!**

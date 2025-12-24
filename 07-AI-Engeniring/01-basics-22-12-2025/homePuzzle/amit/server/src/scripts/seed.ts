import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from '../models/Room';
import Puzzle from '../models/Puzzle';
import Item from '../models/Item';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/station-zero';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Room.deleteMany({});
    await Puzzle.deleteMany({});
    await Item.deleteMany({});
    console.log('Cleared existing data');

    // Create Initialization Chamber (Room 1)
    const initChamber = await Room.create({
      title: 'Initialization Chamber',
      description: `You wake up in a cold, dimly lit chamber. Emergency lights flicker overhead, casting eerie shadows on the metal walls.

A broken terminal flashes ERROR messages on the screen. The air is thick with the smell of burnt circuits.

SYSTEM STATUS: CRITICAL
LIFE SUPPORT: 73%
CREW STATUS: UNKNOWN

You need to repair the terminal to access the station's systems and find out what happened here.`,
      imageAsset: 'init-chamber.jpg',
      connections: {},
      puzzles: []
    });

    // Create Control Room (Room 2)
    const controlRoom = await Room.create({
      title: 'Main Control Room',
      description: `The heart of Station Zero. Massive screens display star charts and system diagnostics. Most are offline.

A captain's log plays on loop: "Day 47... the crew is showing signs of... [STATIC]... we can't trust..."

The main computer needs authentication to restore full systems.`,
      imageAsset: 'control-room.jpg',
      connections: {
        south: initChamber._id.toString()
      },
      puzzles: []
    });

    // Update init chamber connections
    initChamber.connections = {
      north: controlRoom._id.toString()
    };
    await initChamber.save();

    // Create Engineering Bay (Room 3)
    const engineeringBay = await Room.create({
      title: 'Engineering Bay',
      description: `Massive engines hum ominously. Coolant leaks from cracked pipes, creating small pools on the floor.

The reactor is unstable. You'll need to balance the power distribution to prevent a meltdown.`,
      imageAsset: 'engineering.jpg',
      connections: {
        west: controlRoom._id.toString()
      },
      puzzles: []
    });

    controlRoom.connections.east = engineeringBay._id.toString();
    await controlRoom.save();

    // Create Medical Bay (Room 4)
    const medicalBay = await Room.create({
      title: 'Medical Bay',
      description: `Sterile white walls are splattered with... something dark. Medical equipment beeps softly.

A cryo-pod shows signs of forced entry. Patient records are encrypted.`,
      imageAsset: 'medical.jpg',
      connections: {
        east: controlRoom._id.toString()
      },
      puzzles: []
    });

    controlRoom.connections.west = medicalBay._id.toString();
    await controlRoom.save();

    // Create Cargo Hold (Room 5)
    const cargoHold = await Room.create({
      title: 'Cargo Hold',
      description: `Massive crates labeled "CLASSIFIED" are scattered everywhere. One is open, revealing strange equipment.

A security lockbox requires a code sequence.`,
      imageAsset: 'cargo.jpg',
      connections: {
        north: engineeringBay._id.toString()
      },
      puzzles: []
    });

    engineeringBay.connections.south = cargoHold._id.toString();
    await engineeringBay.save();

    // Create Escape Pod Bay (Room 6)
    const escapePodBay = await Room.create({
      title: 'Escape Pod Bay',
      description: `Six escape pods line the walls. Only two remain. The others show signs of emergency launch.

Final destination or last hope? The choice will be yours.`,
      imageAsset: 'escape-pods.jpg',
      connections: {
        south: medicalBay._id.toString()
      },
      puzzles: []
    });

    medicalBay.connections.north = escapePodBay._id.toString();
    await medicalBay.save();

    // Create Observatory (Room 7 - Secret)
    const observatory = await Room.create({
      title: 'Observatory',
      description: `A hidden observatory with a massive window to space. Stars twinkle peacefully, contrasting the chaos inside.

A personal log reveals the truth about Station Zero's mission...`,
      imageAsset: 'observatory.jpg',
      connections: {
        down: cargoHold._id.toString()
      },
      puzzles: []
    });

    // Hidden connection from cargo
    cargoHold.connections.up = observatory._id.toString();
    await cargoHold.save();

    console.log('Created 7 rooms');

    // Create Puzzles

    // Puzzle 1: Terminal Repair (Initialization Chamber)
    const puzzle1 = await Puzzle.create({
      title: 'Terminal Repair Protocol',
      problemDescription: `The terminal's boot sequence is corrupted. You need to write a function that validates system checksums.

Write a function called 'validateChecksum' that takes an array of numbers and returns true if the sum of all numbers equals the last number in the array, false otherwise.

Example:
validateChecksum([1, 2, 3, 6]) → true (1+2+3 = 6)
validateChecksum([5, 10, 15, 29]) → false (5+10+15 ≠ 29)`,
      starterCode: `function validateChecksum(numbers: number[]): boolean {
  // Your code here

}`,
      functionName: 'validateChecksum',
      testCases: [
        {
          input: [[1, 2, 3, 6]],
          expectedOutput: true,
          description: 'Simple checksum validation'
        },
        {
          input: [[5, 10, 15, 30]],
          expectedOutput: true,
          description: 'Larger numbers'
        },
        {
          input: [[1, 1, 1, 1]],
          expectedOutput: false,
          description: 'Invalid checksum'
        },
        {
          input: [[10, 20, 30, 60]],
          expectedOutput: true,
          description: 'Even numbers'
        }
      ],
      rewardItem: {
        name: 'Access Keycard',
        description: 'Grants access to Main Control Room'
      },
      difficulty: 'easy',
      points: 100,
      maxAttempts: 5,
      room: initChamber._id,
      hints: [
        'Sum all numbers except the last one',
        'Compare the sum to the last element',
        'Use array.slice() to get all but last element'
      ]
    });

    initChamber.puzzles.push(puzzle1._id);
    await initChamber.save();

    // Puzzle 2: Authentication System (Control Room)
    const puzzle2 = await Puzzle.create({
      title: 'Authentication Override',
      problemDescription: `The control system needs password validation. Passwords must meet security requirements.

Write a function called 'isValidPassword' that returns true if:
- Length is at least 8 characters
- Contains at least one uppercase letter
- Contains at least one number

Return false otherwise.`,
      starterCode: `function isValidPassword(password: string): boolean {
  // Your code here

}`,
      functionName: 'isValidPassword',
      testCases: [
        {
          input: ['Abcd1234'],
          expectedOutput: true,
          description: 'Valid password'
        },
        {
          input: ['short1'],
          expectedOutput: false,
          description: 'Too short'
        },
        {
          input: ['nouppercase1'],
          expectedOutput: false,
          description: 'No uppercase'
        },
        {
          input: ['NoNumbers'],
          expectedOutput: false,
          description: 'No numbers'
        },
        {
          input: ['Perfect123'],
          expectedOutput: true,
          description: 'Meets all requirements'
        }
      ],
      rewardItem: {
        name: 'Captain\'s Override Key',
        description: 'Unlocks restricted areas'
      },
      difficulty: 'medium',
      points: 150,
      maxAttempts: 5,
      room: controlRoom._id,
      hints: [
        'Check password.length >= 8',
        'Use regex /[A-Z]/ to find uppercase',
        'Use regex /[0-9]/ to find numbers'
      ]
    });

    controlRoom.puzzles.push(puzzle2._id);
    await controlRoom.save();

    // Puzzle 3: Power Distribution (Engineering)
    const puzzle3 = await Puzzle.create({
      title: 'Reactor Power Balance',
      problemDescription: `The reactor needs balanced power distribution across all sectors.

Write a function called 'balancePower' that takes an array of power levels and returns an array where each element is the average of all elements.

Example: balancePower([10, 20, 30]) → [20, 20, 20]`,
      starterCode: `function balancePower(levels: number[]): number[] {
  // Your code here

}`,
      functionName: 'balancePower',
      testCases: [
        {
          input: [[10, 20, 30]],
          expectedOutput: [20, 20, 20],
          description: 'Balance three sectors'
        },
        {
          input: [[5, 15, 10, 10]],
          expectedOutput: [10, 10, 10, 10],
          description: 'Four sectors'
        },
        {
          input: [[100]],
          expectedOutput: [100],
          description: 'Single sector'
        }
      ],
      rewardItem: {
        name: 'Reactor Stabilizer',
        description: 'Prevents core meltdown'
      },
      difficulty: 'medium',
      points: 200,
      maxAttempts: 5,
      room: engineeringBay._id,
      hints: [
        'Calculate the average of all numbers',
        'Create new array filled with that average',
        'Use reduce() to sum, then divide by length'
      ]
    });

    engineeringBay.puzzles.push(puzzle3._id);
    await engineeringBay.save();

    console.log('Created 3 puzzles');

    // Create Items
    await Item.create([
      {
        name: 'Emergency Medkit',
        description: 'Restores health in critical situations',
        type: 'consumable'
      },
      {
        name: 'Station Map',
        description: 'Shows all discovered rooms',
        type: 'tool'
      },
      {
        name: 'Encrypted Data Chip',
        description: 'Contains classified information',
        type: 'quest'
      }
    ]);

    console.log('Created 3 items');
    console.log('\n✅ Database seeded successfully!');
    console.log(`\nRooms created: 7`);
    console.log(`Puzzles created: 3`);
    console.log(`Items created: 3`);
    console.log(`\nFirst Room ID: ${initChamber._id}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

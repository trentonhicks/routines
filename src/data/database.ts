import Dexie, { Table } from 'dexie';
import Habit from '../types/Habit';

export class Database extends Dexie {
  habits!: Table<Habit>; 

  constructor() {
    super('routines');
    this.version(1).stores({
      habits: '++id, name'
    });
  }
}

export const database = new Database();
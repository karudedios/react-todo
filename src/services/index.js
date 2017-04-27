import Dexie from 'dexie';

class DbContext extends Dexie {
  constructor() {
    super("ReactApp");

    this.version(1).stores({
      'todos': '++id, user_id'
    });
  }
}

export default new DbContext();

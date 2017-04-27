// @flow
import { Table } from 'dexie';
import Promise from 'bluebird';
import DbContext from '../index';

import Model from './todo.model';
import type { Todo } from './todo.model';

export default class TodoService {
  store: Table

  constructor() {
    this.store = DbContext.table('todos');
  }

  findOne(props: Object): Promise<Model> {
    return new Promise((resolve, reject) => {
      this.store
        .where(props)
        .first((todo) => {
          if (!todo) {
            return reject("Todo not found");
          }

          return resolve(new Model(todo));
        });
    });
  }

  findById(id: number): Promise<Model> {
    return this.findOne({ id });
  }

  all(): Promise<Array<Model>> {
    return new Promise(resolve => {
      this.store
        .toArray(todos =>
          resolve(todos.map(t => new Model(t))));
    });
  }

  create(todo: Todo): Promise<Model> {
    return new Promise((resolve, reject) => {
      this.store
        .add(todo)
        .then(todo => {
          if (!todo) {
            return reject(new Error("Could not create todo"));
          }

          return resolve(this.findById(todo));
        });
    });
  }

  update(id: number, changes: Todo): Promise<Model> {
    return new Promise((resolve, reject) => {
      this.store
        .update(id, changes)
        .then(success => {
          if (!success) {
            return reject(new Error("Could not update todo"));
          }

          return resolve(this.findById(id));
        });
    });
  }

  remove(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.store
        .where({ id })
        .delete()
        .then(resolve)
        .catch(reject);
    });
  }
}

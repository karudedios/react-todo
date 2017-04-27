// @flow
export type Todo = {
  id?: number,
  name: string,
  done?: boolean
};

export default class Model {
  id: number
  name: string
  done: boolean

  constructor({ id, name, done = false }: Todo) {
    Object.assign(this, { id, name, done });
  }

  toggleCheck() {
    this.done = !this.done;
  }
}

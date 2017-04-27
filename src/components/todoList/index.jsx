// @flow
import './todoList.styl';

import React from 'react';
import TodoItems from './todoItems';
import TodoService from 'services/todo';
import TodoModel from 'services/todo/todo.model';
import type { Todo } from 'services/todo/todo.model';

type ChangeEvent = { target: HTMLInputElement };
type State = { todo: Todo, todos: Array<TodoModel> };

export default class TodoList extends React.Component {
  _input: ?HTMLInputElement;
  _service: TodoService = new TodoService();
  state: State = { todo: { name: "" }, todos: [] };

  updateTodoFromInput = ({ target: { value: name } }: ChangeEvent) => {
    this.updateTodo(name);
  }

  updateTodo = (name: string) => {
    this.setState({ ...this.state, todo: { name } });

    if (this._input) {
      this._input.value = name;
    }
  }

  addItem = (e: Event) => {
    this._service.create(this.state.todo).then(todo => {
      this.updateTodo('');
      this.setState({ ...this.state, todos: this.state.todos.concat(todo) });
    });

    e.preventDefault();
  }

  updateItem = (id: number, changes: Todo) => {
    this._service.update(id, changes).then(updated => {
      const todos = this.state.todos.map(todo => {
        if (todo.id !== updated.id) return todo;
        return Object.assign({}, todo, updated);
      });

      this.setState({ ...this.state, todos });
    });
  }

  removeItem = (todoId: number) => {
    this._service.remove(todoId).then((count) => {
      console.log(count);
      this.setState({ ...this.state, todos: this.state.todos.filter(({ id }) => id !== todoId) });
    });
  }

  componentDidMount() {
    this._service.all().then(todos =>
      this.setState({ ...this.state, todos }));

    this._input = (document.querySelector('.list-form input'): any);

    if (this._input) {
      this._input.focus();
    }
  }

  render() {
    return (
      <div className='todo-list'>
        <div className='header'>
          <h2>You should...</h2>
        </div>

        <form onSubmit={this.addItem} className='list-form'>
          <input type="text" placeholder="...Take out the trash" onChange={this.updateTodoFromInput} />
          <button type="submit">Add</button>
        </form>

        <TodoItems todos={this.state.todos} onRemove={this.removeItem} onUpdate={this.updateItem} />
      </div>
    );
  }
}

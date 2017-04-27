// @flow

import './todoItems.styl';

import React from 'react';
import TodoItem from './todoItem';
import type { Todo } from 'services/todo/todo.model';

type Props = { todos: Array<Todo>, onRemove: number => void, onUpdate: Todo => void };

export default class TodoItems extends React.Component {
  props: Props;

  remove = (todoId: number) => {
    this.props.onRemove(todoId);
  }

  update = (id: number, changes: Todo) => {
    this.props.onUpdate(id, changes);
  }

  render() {
    let todoLis;

    if (!this.props.todos.length) {
      todoLis = (
        <li className="todo-item" style={{ justifyContent:'center' }}>You have no Todos</li>
      );
    } else {
      todoLis = this.props.todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onRemove={this.remove} onUpdate={this.update} />
      ));
    }

    return(
      <ul className="todo-items">
        {todoLis}
      </ul>
    );
  }
}

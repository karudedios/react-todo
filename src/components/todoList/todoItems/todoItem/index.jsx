// @flow

import './todoItem.styl';

import React from 'react';
import TodoModel from 'services/todo/todo.model';
import type { Todo } from 'services/todo/todo.model';

type State = { editMode: boolean };
type Props = { todo: TodoModel, onRemove: number => void, onUpdate: (number, Todo) => void };

export default class TodoItem extends React.Component {
  props: Props;
  state: State = { editMode: false };

  remove = (event: Event) => {
    this.props.onRemove(this.props.todo.id);
    event.stopPropagation();
  }

  editStart = (event: Event) => {
    this.setState({ ...this.state, editMode: true });
    event.stopPropagation();
  }

  editEnd = (event: { target: HTMLInputElement }) => {
    this.setState({ ...this.state, editMode: false });

    if (this.props.todo.name === event.target.value) return;

    this.props.onUpdate(this.props.todo.id, { name: event.target.value });
  }

  toggleDone = () => {
    this.props.onUpdate(this.props.todo.id, { done: !this.props.todo.done });
    return true;
  }

  componentDidUpdate() {
    const element = document.querySelector(`#todo-${this.props.todo.id} input`);

    if (element) {
      element.focus();
    }
  }

  render() {
    const elid = `todo-${this.props.todo.id}`;
    const elClass = `todo-item ${this.props.todo.done ? 'done' : ''}`;

    if (!this.state.editMode) {
      return(
        <li id={elid} className={elClass} onClick={this.toggleDone}>
          <div className="content">{ this.props.todo.name }</div>

          <div className="edit" onClick={this.editStart}></div>
          <div className="remove" onClick={this.remove}></div>
        </li>
      );
    }

    return (
      <li id={elid} className="todo-item">
        <input
          type="text"
          className="content"
          onBlur={this.editEnd}
          onFocus={e => e.target.select()}
          defaultValue={this.props.todo.name} />
      </li>
    );
  }
}

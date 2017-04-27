// @flow
import './app.styl';

import React from 'react';
import TodoList from './todoList/index';

export default class App extends React.Component {
  render() {
    return(
      <TodoList />
    );
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import { GET, EDIT } from "../constants/Api";
import Menu from "../components/Menu";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from 'react';
import { ReactDOM } from 'react-dom';


import { TaskList } from "./TaskList";
import { TaskDetail } from "./TaskDetail";

/**
     * Компонент приложения, который отвечает за отрисовку данных с сервера
     * @component
     * @function {component , id} del - Тип отпрвляемого запроса
       * @param {object} component - Объект компонента, 
            который передается в запрос, для последующего обновления.
       * @param {string} id - Идентификатор элемента.
     */


export default class Api extends Component {
  constructor() {
    super(...arguments);

    const { store } = this.props;
    this.state = {
      data: "",
      popuppDisplay: 0
    };
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }
  componentDidMount() {
    const { store } = this.props;
    const { setApi } = this.props;

    store.dispatch({
      type: GET,
      data: {
        store: store,
        Component: this,
      },
    });
  }

  edit(id, title, component , list) {
    let newTitle = prompt("Напишите новое описание задачи", title);

    this.props.store.dispatch({
      type: EDIT,
      data: {
        Component: this,
        title: newTitle,
        id: id,
        callback: () =>{
            this.state.data.filter(
              (item , index) => {
                if(item.id == id){
                  this.state.data.splice(index, 1);
                  this.state.data.splice(index, 0, {
                    id: item.id, 
                    title: newTitle
                  });
                  console.log(this);
                  this.setState(
                    { refash: 1 }
                  );
                }
              }
            );
        }
      },
    });
  }

  render() {
    if (this.state.data.length == undefined) {
      return (
        <div className="overlay">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      );
    } else if (this.state.data.length == 0) {
      return (
        <div>
          <Menu 
                app={this.props.app}
                api={this} 
                store={this.props.store} 
          />
          <div>Нет данных</div>
        </div>
      );
    } else {
      return (
        <div>
          <Menu 
                app={this.props.app}
                api={this} 
                list={TaskList} 
                store={this.props.store} />
          <Router>
            <Switch>
              <Route path="/task/:id">
                <TaskDetail />
              </Route>
              <Route path="/">
                <TaskList component={this} />
              </Route>
            </Switch>
          </Router>
        </div>
      );
    }
  }
}

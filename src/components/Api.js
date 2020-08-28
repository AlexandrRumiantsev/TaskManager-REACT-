import React, { Component } from "react";
import PropTypes from "prop-types";
import { GET, DEL, EDIT } from "../constants/Api";
import Menu from "../components/Menu";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from 'react';
import  {ReactDOM }  from 'react-dom';


/**
     * Компонент приложения, который отвечает за отрисовку данных с сервера
     * @component
     * @function {component , id} del - Тип отпрвляемого запроса
       * @param {object} component - Объект компонента, 
            который передается в запрос, для последующего обновления.
       * @param {string} id - Идентификатор элемента.
     */

function TaskItem(that) {

  const handleDeleteElement = (id , that ) => {
      that.component.state.data.filter( ( item, index ) => {
        if(item.id == id) that.component.state.data.splice(index, 1);
      });
      
      that.component.props.store.dispatch({
        type: DEL,
        data: {
          'Component' : this ,
          'id': id
        }
      });
      that.component.setState(
                  { data: that.component.state.data }
                )
  };
  return (
    <div>
      <span className="task__title">
        <Link className="task__item" to={"/task/" + that.item.id}>
          Задача №{that.item.id}
        </Link>
      </span>
      <span className="task__discr">{that.item.title}</span>
      <div className="task__btn-block">
        <button
          className="task__item-del"
          onClick={() => { handleDeleteElement(that.item.id , that) }}
        ></button>
        <button
          className="task__item-edit"
          onClick={that.component.edit.bind(
            that.component,
            that.item.id,
            that.item.title
          )}
        ></button>
      </div>
    </div>
  );
}

class TaskList extends Component {
  constructor() {
    super(...arguments);
  }
  render() {
    return (
      <div className="task">
        {this.props.component.state.data.map((item) => (
          <TaskItem item={item} component={this.props.component} />
        ))}
      </div>
    );
  }
}

function TaskDetail(props) {
  return (
    <div>
      <h1>Задача</h1>
      <div className="detail-task">
        <p>Краткое описание</p>
        <p>
          <input type="text" />
        </p>
        <p class="popupp__error"></p>
        <button class="popupp__send">Создать</button>
      </div>
      <Link to="/">На главную</Link>
    </div>
  );
}

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

  edit(id, title, component) {
    let newTitle = prompt("Напишите новое описание задачи", title);
    this.props.store.dispatch({
      type: EDIT,
      data: {
        Component: this,
        title: newTitle,
        id: id,
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

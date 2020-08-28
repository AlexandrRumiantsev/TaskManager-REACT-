import React, { Component , useState } from 'react'
import PropTypes from 'prop-types';
import Popupp from '../components/Popupp'
  
/**
     * Компонент приложения, который отвечает за отрисовку данных с сервера
     * @component Menu
     * @function add_item - Добавление элемента
     */

function Greeting(props) {
  const display = props.display;
  const menu = props.menu;
  const store = props.store;
  if (display) {
    return <Popupp 
              store={store} 
              menu={menu} 
              display={props.display}
              api={props.api}
              />;
  }
  return '';
}

export default class Menu extends Component {
  constructor() {
    super(...arguments);
    

    this.state = {
      popuppDisplay: false
    }


  }
  add_item(){
     console.log(this.props.api);
     this.setState(
         { popuppDisplay: true }
     );
  
  }
  render() {
    return <div className='app__menu menu'>
        <span className='menu__title'>
        	Список задач
        </span>
        <button onClick={this.add_item.bind(this)}>
        	Добавить
        </button>
        <Greeting 
          display={this.state.popuppDisplay}
          store={this.props.store}
          menu={this}
          api={this.props.api}
        />
    </div>
  }
}
import React, { Component , useState } from 'react'
import PropTypes from 'prop-types';

  
/**
     * Компонент приложения, который отвечает за отрисовку данных с сервера
     * @component Menu
     * @function add_item - Добавление элемента
     */
export default class Menu extends Component {
  componentDidMount(){
  	const component = this.props.list;
    const store = this.props.store;
    //Вешаю обработчик на попап, посли отрисовки компонента
    document.querySelector('.popupp__send')
    	.addEventListener("click", function(e){
    		let title = e.target.parentElement
    			.querySelector('input').value;
    		store.dispatch({
		      type: 'ADD_ITEM',
		      data: {
		        'Component' : component ,
		        'title': title,
		        'store': store
		      }
	    	})
    	}, false);
  }
  add_item(){
  
    document.getElementById('popupp').classList.add("active");
  
  }
  render() {
    return <div className='app__menu menu'>
        <span className='menu__title'>
        	Список задач
        </span>
        <button onClick={this.add_item.bind(this)}>
        	Добавить
        </button>
    </div>
  }
}
import React, { Component , useState } from 'react'
import PropTypes from 'prop-types';
import { popupp } from '../functions.js';

export default class Menu extends Component {
  
  add_item(){
  	const component = this.props.app;
    const store = this.props.store;

    document.getElementById('popupp').classList.add("active");
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
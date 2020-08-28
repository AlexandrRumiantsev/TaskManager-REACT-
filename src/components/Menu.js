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
  componentDidMount(){
  	const component = this.props.list;
    const store = this.props.store;

    //Вешаю обработчик на попап, посли отрисовки компонента
    //console.log(this.props.api.state.data.push({id: 2405, title: "hi react"}));
    if(this.props.api.state.data){
      console.log(this.props.api);
      //this.props.api.setState(
        //{ data : {id: 2405, title: "2221hi react"} }
      //);

    }
      
    //this.props.api.setState(
          //{ data: that.component.state.data }
     //);
     /*
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
    	}, false);*/
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
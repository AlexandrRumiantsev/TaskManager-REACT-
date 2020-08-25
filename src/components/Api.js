import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { GET , DEL , EDIT} from '../constants/Api'
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
    
    const {
      store
    } = this.props
    this.state = {
      data: ''
    }
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });

  }
  componentDidMount() {
    
    const {
      store
    } = this.props
    const {
      setApi
    } = this.props

    store.dispatch({
      type: GET,
      data: {
        'store':store,
        'Component' : this
      }
    })
    
  }

  del(id , component) {
    
    this.props.store.dispatch({
      type: DEL,
      data: {
        'Component' : this ,
        'id': id
      }
    })
  }

  edit(id , title , component ) {
    let newTitle = prompt("Напишите новое описание задачи", title);
    this.props.store.dispatch({
      type: EDIT,
      data: {
        'Component' : this ,
        'title': newTitle,
        'id': id
      }
    })
  }

  render() {
    if(this.state.data.length == undefined){
      return <div className='overlay'>
        <div className='lds-ripple'>
          <div></div>
          <div></div>
        </div>
      </div>
    }else if (this.state.data.length == 0){
        return <div>Нет данных</div>
    }else {
      return <div>
              <section className='task-container task'>
              {
                this.state.data.map(item => 
                    <span key={item.id} className='task__item'>
                      <span className='task__title'>
                        Задача №{ item.id }
                      </span>
                      <span className='task__discr'>
                        { item.title }
                      </span>
                      <div className='task__btn-block'>
                        <button className='task__item-del'
                          onClick={
                            this.del.bind(this,item.id)
                          }
                        > 
                        </button>
                        <button className='task__item-edit'
                          onClick={
                            this.edit.bind(this,item.id,item.title)
                          }
                        >  
                        </button>
                       </div> 
                    </span>
                )
              } 
              </section>
            </div>
    }  
  }
}
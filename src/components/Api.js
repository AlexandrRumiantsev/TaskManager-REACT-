import React, { Component } from 'react'
import PropTypes from 'prop-types';


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
      type: 'GET_DATA',
      data: {
        'store':store,
        'Component' : this
      }
    })
    
  }

  del(id , component) {
    
    this.props.store.dispatch({
      type: 'DEL_ITEM',
      data: {
        'Component' : this ,
        'id': id
      }
    })
  }

  edit(id , component) {
    let title = prompt("What's your sign?");
    this.props.store.dispatch({
      type: 'EDIT_ITEM',
      data: {
        'Component' : this ,
        'title': title,
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
                            this.edit.bind(this,item.id)
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
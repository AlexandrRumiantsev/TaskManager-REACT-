import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import Api from '../components/Api'

import * as apiActions from '../actions/ApiActions'

/**
     * Главный компонент приложения
     * @component
     * @function {that} closePopupp - Закрытие попапа
     */



class App extends Component {
  constructor() {
    super(...arguments);
    

    this.state = {
      refrash: ''
    }


  }
  closePopupp(that){
        document.getElementById('popupp').classList.remove('active');
  }
  render() {
    const { store} = this.props
    const { api} = this.props
    const { setApi } = this.props.apiActions

    return <div>
      <Api name={api} store={store} setApi={setApi}/>
      <div id='popupp' class='popupp'>
        <span  
            class='popupp__close'
            onClick={ this.closePopupp.bind(this) }
            >
            
        </span>
        <p>Краткое описание</p>
        <p><input type='text'/></p>
        <p class='popupp__error'></p>
        <button class='popupp__send'>
          Создать
        </button>
    </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    api: state.api
  }
}

function mapDispatchToProps(dispatch) {
  return {
    apiActions: bindActionCreators(apiActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
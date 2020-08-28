import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import Api from '../components/Api'
import Popupp from '../components/Popupp'

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
  render() {
    const { store} = this.props
    const { api} = this.props
    const { setApi } = this.props.apiActions

    return <div>
      <Api 
           name={api} 
           store={store} 
           setApi={setApi} 
           app={this}
      />
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
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Menu from '../components/Menu'
import Api from '../components/Api'

import * as apiActions from '../actions/ApiActions'




class App extends Component {
  constructor() {
    super(...arguments);
    

    this.state = {
      refrash: ''
    }


  }
  closePopupp(){
        console.log(this.parentElement)
  }
  render() {
    const { store} = this.props
    const { api} = this.props
    const { setApi } = this.props.apiActions

    return <div>
      <Menu app={Api} store={store} />
      <Api name={api} store={store} setApi={setApi}/>
      <div id='popupp' class='popupp'>
        <button onClick='closePopupp.bind(this)' 
            class='popupp__close'>
        </button>
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
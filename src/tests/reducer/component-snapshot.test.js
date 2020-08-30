/*
Моментальные тесты 
*/

import React from 'react'
import {render} from '@testing-library/react'
import App from '../../containers/App.js'
import configureStore from '../../store/configureStore'

const store = configureStore()

it('should take a snapshot', () => {
    const { asFragment } = render(<App store={store}/>)
    
    expect(asFragment(<App store={store}/>)).toMatchSnapshot()
   })
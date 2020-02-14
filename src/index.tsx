import React from 'react'
import ReactDOM from 'react-dom'

import { UserContainer } from './containers'

import { IndexComponent } from './components'

import 'ress'

ReactDOM.render(
  <UserContainer.Provider>
    <IndexComponent />
  </UserContainer.Provider>,
  document.getElementById('root')
)

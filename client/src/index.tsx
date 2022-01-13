import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './css/global.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Connection from 'context/connection'

ReactDOM.render(
  <React.StrictMode>
    <Connection>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Connection>
  </React.StrictMode>,
  document.getElementById('root')
)

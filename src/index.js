import React from 'react'
import ReactDOM from 'react-dom/client'
import { HistoryRouter, history } from './utils/history'
import App from './App'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>
)
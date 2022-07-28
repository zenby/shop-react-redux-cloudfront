import React from 'react'
import ReactDOM from 'react-dom'
import 'index.css'
import App from 'components/App/App'
import {store} from 'store/store'
import {Provider} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import axios from 'axios'

axios.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    const status = error?.response?.status

    if (status === 400) {
      showErrorMessage(status, error.response.data?.data)
    }
    if ([401, 403].includes(status)) {
      showErrorMessage(status, error.response.data?.message)
    }

    return Promise.reject(error?.response ?? error)
  }
)

const showErrorMessage = (status: number, message: string) => {
  alert(`${status}: ${message}`)
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

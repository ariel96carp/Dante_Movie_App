import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './components/redux/store'
import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/noto-sans-kr'
import '@fontsource/noto-serif-kr/400.css'
import './styles.css'
import './layout.css'
import './carousel.css'
import './reveal.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

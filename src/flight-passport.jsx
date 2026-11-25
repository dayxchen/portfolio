import React from 'react'
import ReactDOM from 'react-dom/client'
import ProjectPage from './components/ProjectPage.jsx'
import { flightPassportDetails } from './data.js'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectPage project={flightPassportDetails} />
  </React.StrictMode>
)

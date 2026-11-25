import React from 'react'
import ReactDOM from 'react-dom/client'
import ProjectPage from './components/ProjectPage.jsx'
import { craveDetails } from './data.js'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectPage project={craveDetails} />
  </React.StrictMode>
)

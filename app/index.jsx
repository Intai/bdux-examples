import './settings'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app'

const container = document.getElementById('app')
createRoot(container).render(<App />)

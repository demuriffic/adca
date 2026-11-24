import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@fontsource-variable/jost'
import '@fontsource/merriweather/300.css'
import '@fontsource/merriweather/400.css'
import '@fontsource/merriweather/400-italic.css'
import '@fontsource/merriweather/700.css'
import '@fontsource-variable/geist-mono'
import App from './App.jsx'
import SearchPage from './pages/SearchPage.jsx'
import RecommendPage from './pages/RecommendPage.jsx'
import RecipePage from './pages/RecipePage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<SearchPage />} />
          <Route path="recommend" element={<RecommendPage />} />
          <Route path="recipe/:id" element={<RecipePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

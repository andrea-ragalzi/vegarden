import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import ZenHubPage from './pages/ZenHubPage'
import EditProfilePage from './pages/EditProfilePage'

const App = () => {

  return (
    <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/zenhub" element={<LoginPage />} />
              <Route path="/article" element={<LoginPage />} />
              <Route path="/profile" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
    </div>
  )
}

export default App

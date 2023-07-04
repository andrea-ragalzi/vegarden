import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ZenHubPage from './pages/ZenHubPage'
import RegisterPage from "./pages/RegisterPage";

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/zenhub" element={<ZenHubPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

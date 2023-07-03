import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'

const App = () => {

  return (
    <div className="App container">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
    </div>
  )
}

export default App

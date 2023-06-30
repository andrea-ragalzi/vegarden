import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'

const App = () => {

  return (
    <div className="App bg-white dark:bg-dark">
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  )
}

export default App

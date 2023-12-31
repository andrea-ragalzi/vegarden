import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ZenHubPage from './pages/ZenHubPage'
import RegisterPage from "./pages/RegisterPage";
import ArticleCreatePage from "./pages/ArticleCreatePage"
import ArticlePage from "./pages/ArticlePage";
import EditProfilePage from "./pages/EditProfilePage";
import EditArticlePage from "./pages/EditArticlePage";

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/zenhub/:username" element={<ZenHubPage />} />
          <Route path="/article/:articleId" element={<ArticlePage />}></Route>
          <Route path="/article-create" element={<ArticleCreatePage />}></Route>
          <Route path="/edit-profile" element={<EditProfilePage />}></Route>
          <Route path="/edit-article" element={<EditArticlePage />}></Route>
          <Route path="*" element={<div>404</div>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

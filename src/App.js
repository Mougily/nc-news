import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route path="/articles/topic/:topic" element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;

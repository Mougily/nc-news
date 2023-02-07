import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/AllArticles";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;

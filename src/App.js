// import "./App.css";
// import Header from "./components/Header";
// import { Routes, Route } from "react-router-dom";
// import Articles from "./components/AllArticles";

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <Routes>
//         <Route path="/" element={<Articles />} />
//         <Route path="/articles" element={<Articles />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Articles from "./components/AllArticles";
import SingleArticle from "./components/SingleArticle";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;

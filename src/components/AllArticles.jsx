import { getArticles } from "../utils/ApiCalls";
import { useState, useEffect } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articles) => {
      console.log(articles);
      setArticles(articles);
    });
  }, [articles]);

  return (
    <div>
      <ul>
        {" "}
        {articles.map(
          ({
            author,
            title,
            topic,
            article_img_url,
            article_id,
            created_at,
          }) => {
            return (
              <li key={article_id}>
                <div className="article">
                  <div>
                    <img src={article_img_url} alt={article_id}></img>
                  </div>
                  <div>
                    <h2>{title}</h2>
                    <h3>author: {author}</h3>
                    <p>topic: {topic}</p>
                    <p>date published: {created_at}</p>
                  </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default Articles;

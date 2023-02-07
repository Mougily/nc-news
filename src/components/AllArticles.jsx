import { getArticles } from "../utils/ApiCalls";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getArticles().then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, []);

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  if (loading) {
    return <h2>Still loading...</h2>;
  }
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
                <div className="article_container">
                  <div className="article">
                    <div>
                      <img
                        className="article_img"
                        src={article_img_url}
                        alt={article_id}
                      ></img>
                    </div>
                    <div>
                      <h2 className="article_title">{title}</h2>
                      <h3 className="article_author">author: {author}</h3>
                      <p className="article_topic">topic: {topic}</p>
                      <p className="article_date_published">
                        date published: {created_at}
                      </p>
                      <button
                        onClick={() => routeChange(`/articles/${article_id}`)}
                      >
                        view article
                      </button>
                    </div>
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

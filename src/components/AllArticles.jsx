import { getArticles } from "../utils/ApiCalls";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ViewTopics from "./ViewTopics";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState(null);
  const [sortby, setSortby] = useState("created_at");
  const [message, setMessage] = useState("date published");

  useEffect(() => {
    setLoading(true);
    getArticles(topic, sortby).then((articles) => {
      setArticles(articles);
      setLoading(false);
    });
  }, [topic, sortby]);

  useEffect(() => {
    switch (sortby) {
      case "author":
        setMessage("author");
        break;
      case "created_at":
        setMessage("date published");
        break;
      case "votes":
        setMessage("most popular");
        break;
      default:
        break;
    }
  }, [sortby]);

  const handleTopicChange = (selectedTopic) => {
    console.log(selectedTopic);
    setTopic(selectedTopic);
  };
  if (loading) {
    return <h3 className="loading_topics">loading topics...</h3>;
  }
  return (
    <div>
      <ViewTopics onTopicChange={handleTopicChange} />
      <p className="sort_by_msg">
        {topic} articles sorted by {message} in ascending order
      </p>
      <section className="filter_buttons">
        <p className="sans">filter by:</p>
        <button onClick={() => setSortby("author")}>author</button>
        <button onClick={() => setSortby("created_at")}>date published</button>
        <button onClick={() => setSortby("votes")}>most popular</button>
      </section>
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
              <div className="parent_container">
                <div className="parent_container">
                  <div>
                    <img
                      className="placeholder"
                      src={article_img_url}
                      alt={article_id}
                    ></img>
                  </div>
                  <div>
                    <h2 className="caps">{title}</h2>
                    <h3 className="caps">author: {author}</h3>
                    <p className="sans">topic: {topic}</p>
                    <p className="sans">date published: {created_at}</p>
                    <Link className="caps" to={`/articles/${article_id}`}>
                      view article
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default Articles;

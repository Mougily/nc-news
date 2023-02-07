import { useEffect, useState } from "react";
import { getArticleById } from "../utils/ApiCalls";
import { useParams } from "react-router-dom";

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  console.log(article, "under useState");

  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((article) => {
      console.log(article, "inside useEffect");
      setArticle(article);
    });
  }, [article_id]);
  return (
    <div className="single_article">
      <h2 className="single_article_title">{article.title}</h2>

      <img
        className="single_article_img"
        src={article.article_img_url}
        alt="single_article_image"
      />
      <p className="author">author: {article.author}</p>
      <p className="data_published">date published: {article.created_at}</p>
      <p className="article_body">{article.body}</p>
    </div>
  );
};

export default SingleArticle;

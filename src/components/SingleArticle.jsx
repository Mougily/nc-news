import { useEffect, useState } from "react";
import { getArticleById, voteOnArticle } from "../utils/ApiCalls";
import { useParams } from "react-router-dom";

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);

  const { article_id } = useParams();

  useEffect(() => {
    setLoading(true);
    getArticleById(article_id).then((article) => {
      setArticle(article);
      setLoading(false);
    });
  }, [article_id]);

  // const handleIncreaseVotes = (article_id) => {
  //   voteOnArticle(article).then(() => {
  //     setArticle((prevArticles) =>
  //       prevArticles.map((user) => {
  //         if (article.article_id === article_id) {
  //           return { ...article, votes: article.votes + 1 };
  //         }
  //         return user;
  //       })
  //     );
  //   });
  // };

  const handleIncreaseVotes = (article_id) => {
    console.log(article_id);
    voteOnArticle(article_id).then((updatedArticle) => {
      setArticle(updatedArticle);
    });
  };

  if (loading) {
    return <h2>Still loading...</h2>;
  }
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
      <p className="article_votes">Votes: {article.votes}</p>
      <button onClick={() => handleIncreaseVotes(article.article_id)}>
        Vote up!
      </button>
    </div>
  );
};

export default SingleArticle;

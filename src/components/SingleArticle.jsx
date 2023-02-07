import { useEffect, useState } from "react";
import { getArticleById, getArticleCommentsById } from "../utils/ApiCalls";
import { useParams } from "react-router-dom";

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const { article_id } = useParams();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getArticleById(article_id),
      getArticleCommentsById(article_id),
    ]).then(([article, comments]) => {
      setArticle(article);
      setComments(comments);
      setLoading(false);
    });
  }, [article_id]);

  if (loading) {
    return <h2>Still loading...</h2>;
  }

  const commentsHandler = () => {
    const commentsList = comments.data.comments;
    return (
      <p>
        <h1>hello</h1>
        {commentsList.map((comment) => {
          <div>
            <ol>{comment.author}</ol>
            <ol>{comment.body}</ol>
            <ol>{comment.votes}</ol>
          </div>;
        })}
      </p>
    );
  };
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
      <button onClick={commentsHandler}>view article comments</button>
      {comments.length > 0 && commentsHandler()}
    </div>
  );
};

export default SingleArticle;

import { useEffect, useState } from "react";
import { getArticleById, getArticleCommentsById } from "../utils/ApiCalls";
import { useParams } from "react-router-dom";

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
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
    setShowComments(!showComments);
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
      <p className="article_votes">Votes: {article.votes}</p>
      <button className="comment_button" onClick={commentsHandler}>
        {showComments ? "Hide Comments" : "View Comments"}
      </button>
      {showComments && (
        <div className="article_comments_container">
          <h2>comments</h2>
          {comments.data.comments.map((comment) => (
            <div key={comment.comment_id} className="individual_comment">
              <ol className="comment_author">Author: {comment.author}</ol>
              <ol className="comment_body">Comment: {comment.body}</ol>
              <ol className="comment_votes">Votes: {comment.votes}</ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleArticle;

import { useEffect, useState } from "react";

import {
  getArticleById,
  getArticleCommentsById,
  voteUpOnArticle,
  voteDownOnArticle,
} from "../utils/ApiCalls";

import { useParams } from "react-router-dom";

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [err, setErr] = useState(null);

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

  const handleIncreaseVotes = (article_id) => {
    setArticle(() => {
      if (article.article_id === article_id) {
        return { ...article, votes: article.votes + 1 };
      }
      setErr(null);
      return article;
    });
    voteUpOnArticle(article_id).catch((err) => {
      setErr("Something went wrong, please try again.");
    });
  };

  const handleDecreaseVotes = (article_id) => {
    setArticle(() => {
      if (article.article_id === article_id) {
        return { ...article, votes: article.votes - 1 };
      }
      setErr(null);
      return article;
    });
    voteDownOnArticle(article_id).catch((err) => {
      setErr("Something went wrong, please try again.");
    });
  };

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
      {err ? <p>{err}</p> : null}
      <button onClick={() => handleIncreaseVotes(article.article_id)}>
        Vote up!
      </button>
      {err ? <p>{err}</p> : null}
      <button onClick={() => handleDecreaseVotes(article.article_id)}>
        Vote down!
      </button>

      <button className="comment_button" onClick={commentsHandler}>
        {showComments ? "Hide Comments" : "View Comments"}
      </button>
      {showComments && (
        <div className="article_comments_container">
          <h2>comments</h2>
          {comments.data.comments.length > 0 ? (
            comments.data.comments.map((comment) => (
              <div>
                <div key={comment.comment_id} className="individual_comment">
                  <ol className="comment_author">Author: {comment.author}</ol>
                  <ol className="comment_body">Comment: {comment.body}</ol>
                  <ol className="comment_votes">Votes: {comment.votes}</ol>
                </div>
              </div>
            ))
          ) : (
            <p>No comments found</p>
          )}
        </div>
      )}
    </div>
  );
};
export default SingleArticle;

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
  const [votedUp, setUpVoted] = useState(false);
  const [votedDown, setDownVoted] = useState(false);
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
      if (err) {
        setErr("Something went wrong, please try again.");
      }
    });
    setUpVoted(true);
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
      if (err) {
        setErr("Something went wrong, please try again.");
      }
    });
    setDownVoted(true);
  };

  if (loading) {
    return <h2>Still loading...</h2>;
  }

  const commentsHandler = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="placeholer">
      <h2 className="accent_title">{article.title}</h2>

      <img
        className="placeholder"
        src={article.article_img_url}
        alt="single_article_image"
      />
      <p className="caps">written by: {article.author}</p>
      <p className="sans">date published: {article.created_at}</p>
      <p className="justify">{article.body}</p>
      <p className="caps">Votes: {article.votes}</p>
      {err ? <p>{err}</p> : null}
      <button
        onClick={() => handleIncreaseVotes(article.article_id)}
        disabled={votedUp}
      >
        Vote up!
      </button>

      {err ? <p>{err}</p> : null}

      <button
        onClick={() => handleDecreaseVotes(article.article_id)}
        disabled={votedDown}
      >
        Vote down!
      </button>

      <button className="comment_button" onClick={commentsHandler}>
        {showComments ? "Hide Comments" : "View Comments"}
      </button>
      {showComments && (
        <div className="article_comments_container">
          <h2 className="accent">comments</h2>
          {comments.data.comments.length > 0 ? (
            comments.data.comments.map((comment) => (
              <div>
                <div key={comment.comment_id} className="line-btm">
                  <ol className="caps">Author: {comment.author}</ol>
                  <ol className="sans">Comment: {comment.body}</ol>
                  <ol className="caps">Votes: {comment.votes}</ol>
                </div>
              </div>
            ))
          ) : (
            <p className="accent">No comments found</p>
          )}
        </div>
      )}
    </div>
  );
};
export default SingleArticle;

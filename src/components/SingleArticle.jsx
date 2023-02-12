import { useEffect, useState } from "react";
import {
  getArticleById,
  getArticleCommentsById,
  deleteComment,
} from "../utils/ApiCalls";
import { useParams } from "react-router-dom";
import CommentAdder from "./CommentAdder";
import ErrorPage from "./ErrorPage";
import Votes from "./Votes";

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const { article_id } = useParams();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getArticleById(article_id),
      getArticleCommentsById(article_id),
    ])
      .then(([article, comments]) => {
        setArticle(article);
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [article_id]);

  if (error) {
    return <ErrorPage message={error} />;
  }

  if (loading) {
    return <h2>Still loading...</h2>;
  }

  const commentsHandler = () => {
    setShowComments(!showComments);
  };

  const deleteHandler = (comment_id, author) => {
    const user = "tickle122";
    if (author !== user) {
    } else {
      setComments(
        comments.filter((comment) => comment.comment_id !== comment_id)
      );
      setDeleteLoading(true);
      deleteComment(comment_id)
        .then(() => {
          setDeleteLoading(false);
        })
        .catch((error) => {
          if (error) {
            window.alert("cannot delete, try again later");
          }
        });
    }
  };

  if (deleteLoading) {
    return <p>deleting comment...</p>;
  }

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
      <Votes
        article_id={article.article_id}
        article={article}
        setArticle={setArticle}
      />

      <button className="comment_button" onClick={commentsHandler}>
        {showComments ? "Hide Comments" : "View Comments"}
      </button>
      {showComments && (
        <div className="article_comments_container">
          <h2 className="accent">comments</h2>
          <CommentAdder
            setComments={setComments}
            article_id={article.article_id}
          />

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div>
                <div key={comment.comment_id} className="line-btm">
                  <ol className="caps">Author: {comment.author}</ol>
                  <ol className="sans">Comment: {comment.body}</ol>
                  <ol className="caps">Votes: {comment.votes}</ol>
                </div>
                {comment.author === "tickle122" ? (
                  <button
                    className="delete_comment_btn"
                    onClick={() =>
                      deleteHandler(comment.comment_id, comment.author)
                    }
                  >
                    delete comment
                  </button>
                ) : null}
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

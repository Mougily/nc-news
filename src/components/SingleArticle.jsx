import { useEffect, useState } from "react";
import { getArticleById, getArticleCommentsById } from "../utils/ApiCalls";
import { useParams } from "react-router-dom";
import CommentAdder from "./CommentAdder";
import Votes from "./Votes";

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

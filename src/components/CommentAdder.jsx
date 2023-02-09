import { useState } from "react";
import { postComment } from "../utils/ApiCalls";

const CommentAdder = ({ article_id, setComments }) => {
  const [message, setMessage] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.length) {
      return setMessage("cannot post blank comment");
    }
    setMessage("comment posted!");
    setIsLoading(true);
    postComment(article_id, newComment)
      .then((commentFromApi) => {
        setIsLoading(false);
        setComments((currComments) => {
          setNewComment("");
          return [commentFromApi, ...currComments];
        });
      })
      .catch((error) => {
        if (error) {
          setIsLoading(false);
          setMessage(
            "An error occurred while posting the comment. Try again later."
          );
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="CommentAdder">
        <label className="caps" htmlFor="newComment">
          ...Leave a comment
        </label>
        <textarea
          id="newComment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>

        <button disabled={isLoading}>add comment</button>
      </form>
      <p className="comment_msg">{message}</p>
    </div>
  );
};

export default CommentAdder;

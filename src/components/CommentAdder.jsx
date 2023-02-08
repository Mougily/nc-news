import { useState } from "react";
import { postComment } from "../utils/ApiCalls";

// const CommentAdder = (article_id, setComments) => {
//   const [newComment, setNewComment] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     postComment(article_id, newComment, userName).then((commentFromApi) => {
//       setComments((currComments) => {
//         return [commentFromApi, ...currComments];
//       });
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="CommentAdder">
//       <label htmlFor="newComment">Leave a comment</label>
//       <textarea
//         id="newComment"
//         vaule={newComment}
//         onChange={(e) => setNewComment(e.target.value)}
//       ></textarea>
//       <button>add comment</button>
//     </form>
//   );
// };

// export default CommentAdder;

const CommentAdder = (article_id, setComments) => {
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  console.log(newComment, userName, article_id);

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(article_id, newComment, userName).then((commentFromApi) => {
      setComments((currComments) => {
        return [commentFromApi, ...currComments];
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="CommentAdder">
      <label htmlFor="newComment">Leave a comment</label>
      <textarea
        id="newComment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <label htmlFor="userName">Enter your username</label>
      <input
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button>add comment</button>
    </form>
  );
};

export default CommentAdder;

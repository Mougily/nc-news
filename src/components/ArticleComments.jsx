import { getArticleCommentsById, postComment } from "../utils/ApiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// const ArticleComments = () => {
//   const [comments, setComments] = useState([]);

//   const { article_id } = useParams();

//   useEffect(() => {
//     getArticleCommentsById(article_id).then((comments) => {

//       setComments(comments);
//     });
//   }, [article_id]);

//   return (<div>
//     <button onClick={()=>{
// clickHandler
//     }}>post a comment</button><p>{comments}</p></div>)
// };

// export default ArticleComments;

const ArticleComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { article_id } = useParams();

  useEffect(() => {
    getArticleCommentsById(article_id).then((comments) => {
      setComments(comments);
    });
  }, [article_id]);

  const handleCommentPost = () => {
    postComment(article_id, newComment).then((postedComment) => {
      setComments([...comments, postedComment]);
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentPost}>post a comment</button>
      </div>
      <p>{comments}</p>
    </div>
  );
};

export default ArticleComments;

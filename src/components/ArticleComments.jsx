import { getArticleCommentsById } from "../utils/ApiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArticleComments = () => {
  const [comments, setComments] = useState([]);

  const { article_id } = useParams();

  useEffect(() => {
    getArticleCommentsById(article_id).then((comments) => {
      console.log(comments);
      setComments(comments);
    });
  }, [article_id]);

  return <p>{comments}</p>;
};

export default ArticleComments;

import { voteUpOnArticle, voteDownOnArticle } from "../utils/ApiCalls";
import { useState } from "react";

const Votes = ({ article_id, article, setArticle }) => {
  const [votedUp, setUpVoted] = useState(false);
  const [votedDown, setDownVoted] = useState(false);
  const [err, setErr] = useState(null);

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

  return (
    <section>
      {err ? <p>{err}</p> : null}
      <button
        onClick={() => handleIncreaseVotes(article_id)}
        disabled={votedUp}
      >
        Vote up!
      </button>

      <button
        onClick={() => handleDecreaseVotes(article_id)}
        disabled={votedDown}
      >
        Vote down!
      </button>
    </section>
  );
};

export default Votes;

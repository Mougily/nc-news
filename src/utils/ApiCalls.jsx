import axios from "axios";

const apiCaller = axios.create({
  baseURL: "https://news-app-mg2a.onrender.com/api/",
});

export const getTopics = () => {
  return apiCaller.get("/topics").then((response) => {
    return response.data.topics.map((topic) => {
      return topic.slug;
    });
  });
};

export const getArticles = () => {
  return apiCaller.get("/articles").then((response) => {
    console.log(response.data.articles);
    return response.data.articles;
  });
};

export const getArticleById = (article_id) => {
  return apiCaller.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article[0];
  });
};

export const voteUpOnArticle = (article_id) => {
  return apiCaller
    .patch(`/articles/${article_id}`, { inc_votes: 1 })
    .then((response) => {
      return response.data.article;
    });
};

export const voteDownOnArticle = (article_id) => {
  return apiCaller
    .patch(`/articles/${article_id}`, { inc_votes: -1 })
    .then((response) => {
      return response.data.article;
    });
};

export const getArticleCommentsById = (article_id) => {
  return apiCaller.get(`articles/${article_id}/comments`);
};

export const postComment = (article_id, newComment, userName) => {
  const article_num = article_id.article_id;
  const postBody = {
    username: userName,
    body: newComment,
  };

  return apiCaller
    .post(`articles/${article_num}/comments`, postBody)
    .then((response) => {
      return response.data.comment;
    });
};

import axios from "axios";

const apiCaller = axios.create({
  baseURL: "https://news-app-mg2a.onrender.com/api",
});

export const getTopics = () => {
  return apiCaller.get("/topics").then((response) => {
    return response.data.topics.map((topic) => {
      return topic.slug;
    });
  });
};

export const getArticles = (topic, sortby, order = "ASC") => {
  let endpoint = "/articles";
  let params = { order: "ASC" };

  if (topic) {
    params.topic = topic;
  }

  if (sortby) {
    params.sort_by = sortby;
  }

  if (sortby) {
    params.order = order;
  }

  return apiCaller.get(endpoint, { params }).then((response) => {
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
  return apiCaller.get(`articles/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
};

export const postComment = (article_id, newComment) => {
  const postBody = {
    username: "tickle122",
    body: newComment,
  };

  return apiCaller
    .post(`articles/${article_id}/comments`, postBody)
    .then((response) => {
      return response.data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return apiCaller.delete(`/comments/${comment_id}`).then((response) => {
    return response.data.comment;
  });
};

export const getUsers = () => {
  return apiCaller.get("/users").then((response) => {
    return response.data.users;
  });
};

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

export const getArticleCommentsById = (article_id) => {
  return apiCaller.get(`articles/${article_id}/comments`);
};

export const postComment = (article_id, comment) => {
  return apiCaller
    .post(`articles/${article_id}/comments`, comment)
    .then((response) => {
      return response.data.comment;
    });
};

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

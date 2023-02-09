import { useState, useEffect } from "react";
import { getTopics } from "../utils/ApiCalls";

import { useNavigate } from "react-router-dom";

const ViewTopics = ({ onTopicChange }) => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  useEffect(() => {
    setLoading(true);
    getTopics().then((topics) => {
      setTopics(topics);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h3 className="caps">loading topics...</h3>;
  }

  const handleChange = (event) => {
    const topic = event.target.value;
    setSelectedTopic(topic);
    onTopicChange(topic);
    if (!topic) {
      routeChange(`/articles`);
    } else {
      routeChange(`/articles/topic/${topic}`);
    }
  };

  return (
    <div>
      <select className="topics_dropdown" onChange={handleChange}>
        <option value="">select a topic</option>
        <option value="">all</option>
        {topics.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ViewTopics;

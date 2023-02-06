import { useState, useEffect } from "react";
import { getTopics } from "../utils/ApiCalls";

const Header = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topics) => {
      console.log(topics);
      setTopics(topics);
    });
  }, []);

  const changeHandler = (event) => {
    setTopics(event.target.value);
  };
  return (
    <div>
      <h1>NEWS</h1>
      <p>Select a topic</p>
      <select onChange={(event) => changeHandler(event)}>
        <option value={""}>all</option>
        {topics.map((topic) => {
          return (
            <option key={topic} value={topic}>
              {topic}
            </option>
          );
        })}
      </select>
      <button>Topics</button>
    </div>
  );
};

export default Header;

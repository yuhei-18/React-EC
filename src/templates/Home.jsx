import React from "react";
import { useSelector } from "react-redux";
import { getUserId, getUsername } from "../reducks/users/selectors"

const Home = () => {
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);

  console.log(username);

  return (
    <div>
      <h2>Home</h2>
      <p>uid:{uid}</p>
      <p>username:{username}</p>
    </div>
  )
};

export default Home;

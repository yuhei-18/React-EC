import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserId, getUsername } from "../reducks/users/selectors"
import { signOut } from "../reducks/users/operations";

const Home = () => {
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Home</h2>
      <p>uid:{uid}</p>
      <p>username:{username}</p>
      <button onClick={() => dispatch(signOut())}>
        サインアウト
      </button>
    </div>
  )
};

export default Home;

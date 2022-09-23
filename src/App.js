import React from 'react';
import Button from 'react-bootstrap/Button'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {LOGIN_REQUEST, LOGOUT, USER_POSTS_FETCH_REQUESTED} from "./store/actions";
import {useDispatch, useSelector} from "react-redux";

function App() {
  const dispatch = useDispatch()
  const isLoginPending = useSelector((state)=> state.isLoginPending)
  const error = useSelector((state)=> state.user.error)
  const token = useSelector((state)=> state.user.token)

  const handleClick = () => {
    dispatch({
      type: USER_POSTS_FETCH_REQUESTED,
      payload: {
        userId: 1,
        actionId: 1
      }
    })
    dispatch({
      type: USER_POSTS_FETCH_REQUESTED,
      payload: {
        userId: 1,
        actionId: 2
      }
    })
    dispatch({
      type: USER_POSTS_FETCH_REQUESTED,
      payload: {
        userId: 1,
        actionId: 3
      }
    })
    dispatch({
      type: USER_POSTS_FETCH_REQUESTED,
      payload: {
        userId: 1,
        actionId: 4
      }
    })
  }
  const handleLoginClick = () => {

    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        username: 'user1',
        password: 'user1password'
      }
    })
  }
  const handleLogoutClick = () => {
    dispatch({ type: LOGOUT})
  }

  return (
    <div className="App">

      <Button onClick={handleClick}>
        Get Posts
      </Button>
      <div className="app__login-container">
        <Button onClick={handleLoginClick}>Log in</Button>
        <Button onClick={handleLogoutClick}>Log out</Button>
        {isLoginPending && <p>Logging in... </p>}
        {error && <p>Error: {error}</p>}
        {token && <p>{token}</p>}
      </div>

    </div>
  );
}

export default App;

import React, {useReducer} from 'react';
import axios from 'axios';
import githubContext from './githubContext';
import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types';
import GithubReducer from './githubReducer';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
      users: [],
      user: {},
      repos: [],
      loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search Users
  const searchUsers = async (text) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users?q = ${text}&
      client_id = ${githubClientId}&
      client_secret = ${githubClientSecret}`); 

      dispatch({
          type: SEARCH_USERS,
          payload: res.data.items,
          loading: false,
      })  
  }

  //Get Users
  const getUser = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?
      client_id = ${githubClientId}&
      client_secret = ${githubClientSecret}`); 
    
      dispatch({
        type: GET_USER,
        payload: res.data,
        loading: false
    });
  }

  //Get Repos
  const getUserRepos = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&
      sort = created:asc&
      client_id = ${githubClientId}&
      client_secret = ${githubClientSecret}`); 
      
      dispatch({
        type: GET_REPOS,
        payload: res.data,
    });
  }
  
  //Clear Users
  const clearUsers = () => {
    dispatch({
        type: CLEAR_USERS,
    });
  };

  //Set Loading
  const setLoading = () => dispatch({type: SET_LOADING});

  return (
        <githubContext.Provider
            value= {{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUsers,
                getUser,
                getUserRepos,
                clearUsers
            }}
        >
            {props.children}

        </githubContext.Provider>
    );
};

export default GithubState;

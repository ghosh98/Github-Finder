import React, { useContext, useState } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {

    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext)

   const [text, setText] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (text === '') {
            alertContext.setAlert('Please enter a user name to be search', 'light');
        } else {
            githubContext.searchUsers(text);
            setText('');
        }
    };

    const onChange = (e) => {
        this.setText(e.text.value); //update component state with form
    };    

    return (
      <div>
          <form className='form' onSubmit={onSubmit}>
              <input 
              type="text" 
              name="text" 
              placeholder = "Search Users...." 
              value = {text}
              onChange = {onChange}
              />
              <input 
              type="submit" 
              value = "Search" 
              className ="btn btn-dark btn-block" 
              />
          </form>
          {githubContext.users.length > 0 && <button className='btn btn-dark btn-block' 
          onClick={githubContext.clearUsers}>
              Clear
          </button> } 
      </div>
    )
};


export default Search;
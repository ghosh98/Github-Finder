import React from 'react';
import PropTypes from 'prop-types'

export const RepoItem = (repos) => {
  return (
    <div className='card'>
        <h3>
            <a href={repos.html_url}>{repos.name}</a>
        </h3>
    </div>
  )
}

RepoItem.propTypes = {
    repos: PropTypes.object.isRequired
}

export default RepoItem;

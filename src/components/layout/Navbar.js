import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({icon, title}) => { //icon and title are passed in as props.
    return (
        <Navbar className = "navbar bg-primary">
            <h1>
                <i className={icon}/> {title}
            </h1>
            <ul>
              <li>
                <Link to = "/"> Home </Link>
              </li>
              <li>
                <Link to="/about"> About </Link>
              </li>
            </ul>
      </Navbar>
    )
}
Navbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};


export default Navbar;


import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <div>
      <nav>
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        {" | "}
        <Link to="/new" activeClassName="active">Add Poll</Link>
        {" | "}
        <Link to="/polls" activeClassName="active">MyPolls</Link>
        {" | "}
        <Link to="/auth" activeClassName="active">User</Link>
        {" | "}
        <Link to="/about" activeClassName="active">About</Link>
      </nav>
    </div>
  );
};

// Header.propTypes = {
//   loading: PropTypes.bool.isRequired
// };

export default Header;


// <nav>
//   <IndexLink to="/" activeClassName="active">Home</IndexLink>
//   {" | "}
//   <Link to="/courses" activeClassName="active">Courses</Link>
//   {" | "}
//   <Link to="/authors" activeClassName="active">Authors</Link>
//   {" | "}
//   <Link to="/about" activeClassName="active">About</Link>
// </nav>

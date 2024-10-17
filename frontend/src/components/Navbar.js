import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light mb-4">
      <div className="container">
        <ul className="nav nav-pills justify-content-center mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Create Rule</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/combine">Combine Rules</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/evaluate">Evaluate Rule</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/modify">Modify Rule</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

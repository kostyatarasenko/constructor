import React from 'react';

import GoBack from '@assets/images/Constructor/arrowLeft.svg';

const Navbar = ({ title, goBack }) => (
  <nav id="navbar">
    {
      goBack ? (
        <div
          className="navbar-goback-container"
          onClick={goBack}
        >
          <img src={GoBack} alt="go-back" />
        </div>
      ) : null
    }
    <div id="navbar-title">
      <span>
          {title}
        </span>
    </div>
  </nav>
);

export default Navbar;

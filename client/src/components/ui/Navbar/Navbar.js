import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link
        to='/'
      >
        Woofer
        {/* <img src={WooferLogo} alt='QuickCart Logo' className={classes.logoLink}></img> */}
      </Link>
    </nav >
  );
};

export default Navbar;

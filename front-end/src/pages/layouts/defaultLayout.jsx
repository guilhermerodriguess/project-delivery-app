import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/Navbar/Navbar';
import './defaultLayout.css';

function DefaultLayout({ children }) {
  return (
    <div className="default-layout">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;

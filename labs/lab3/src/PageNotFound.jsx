import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Navbar from './Navbar';

function PageNotFound(props) {

  return (
    <div className="container py-4">
    <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>

      <Navbar />

      <div className=" p-4 border rounded-3 mb-2" style={{ backgroundColor: 'rgba(200, 0, 0, 0.9)' }}>
        <h1>Page not found</h1>
      </div>

      
    <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
    }

export default PageNotFound;
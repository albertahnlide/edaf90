import React from 'react';
import { useOutletContext } from 'react-router-dom';

function ErrorBoundary(props) {

    return (
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>404 Page not found</h2>
        </div>          
    );
    }

export default ErrorBoundary;
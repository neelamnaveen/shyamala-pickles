import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>403 - Unauthorized</h1>
      <p>Sorry, but you don't have permission to access this page.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Unauthorized;

  import React from 'react';
  import { Link } from 'react-router-dom';

  const Dashboard = ({ token }) => {
    return (
      <div className="dashboard-container">
        <h2>Welcome to Your Dashboard</h2>
        <p>Choose an option to proceed:</p>

        <div className="options">
          <Link to="/transaction">
            <button className="option-button">Go to Transaction Page</button>
          </Link>
          <Link to="/new-page">
            <button className="option-button">Go to New Page</button>
          </Link>
        </div>
      </div>
    );
  };

  export default Dashboard;


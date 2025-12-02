import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get logged-in user info

  return (
    <div className="dashboard-container-main">
      
      {/* Sidebar with dashboard actions */}
      <div className="dashboard-sidebar">
        <h3>Dashboard Actions</h3>

        {/* Actions available for Employee, HR, Manager */}
        {['Employee', 'HR', 'Manager'].includes(user.role) && (
          <>
            {/* Navigate to own profile */}
            <div className="card" onClick={() => navigate(`/view-employee/${user.employeeId || user.id}`)}>
              <h4>My Profile</h4>
              <p>View your profile</p>
            </div>

            {/* Update work status */}
            <div className="card" onClick={() => navigate('/employee-status')}>
              <h4>Update Status</h4>
              <p>Update your current work status</p>
            </div>
          </>
        )}

        {/* HR-specific actions */}
        {user.role === 'HR' && (
          <>
            {/* View summary of all employees */}
            <div className="card" onClick={() => navigate('/employee-summary')}>
              <h4>Employee Summary</h4>
              <p>See overview status of all employees</p>
            </div>

            {/* Add a new employee */}
            <div className="card" onClick={() => navigate('/add-employee')}>
              <h4>Add Employee</h4>
              <p>Add new employee to the system</p>
            </div>
          </>
        )}

        {/* Employee-specific actions */}
        {user.role === 'Employee' && (
          <>
            {/* View coworkers by department */}
            <div className="card" onClick={() => navigate('/search-department')}>
              <h4>View by Department</h4>
              <p>Find coworkers in your workspace</p>
            </div>
          </>
        )}

        {/* Employee list available for HR and Manager */}
        {['HR', 'Manager'].includes(user.role) && (
          <div className="card" onClick={() => navigate('/dashboard/employees')}>
            <h4>Employee List</h4>
            <p>View all employees</p>
          </div>
        )}
      </div>

      {/* Main dashboard area */}
      <div className="dashboard-main">
        <h1>Welcome, {user.fullname}!</h1>
        <p>Your role: {user.role}</p>
        <p>This is your dashboard. Use the left panel to navigate through actions.</p>
      </div>
    </div>
  );
};

export default Dashboard;

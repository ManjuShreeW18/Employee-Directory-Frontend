import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-container-main">
      <div className="dashboard-sidebar">
        <h3>Dashboard Actions</h3>

        {['Employee', 'HR', 'Manager'].includes(user.role) && (
          <>
          
            <div className="card" onClick={() => navigate(`/view-employee/${user.employeeId || user.id}`)}>
              <h4>My Profile</h4>
              <p>View your profile</p>
            </div>
            <div className="card" onClick={() => navigate('/employee-status')}>
                <h4>Update Status</h4>
                <p>Update your current work status</p>
            </div>
          </>
        )}

        {user.role === 'HR' && (
          <>
            <div className="card" onClick={() => navigate('/employee-summary')}>
              <h4>Employee Summary</h4>
              <p>See overview status of all employees</p>
            </div>
            <div className="card" onClick={() => navigate('/add-employee')}>
                <h4>Add Employee</h4>
                <p>Add new employee to the system</p>
            </div>
          </>
        )}

        {user.role === 'Employee' && (
          <>
            

            <div className="card" onClick={() => navigate('/search-department')}>
              <h4>View by Department</h4>
              <p>Find coworkers in your workspace</p>
            </div>
          </>
        )}

        {['HR', 'Manager'].includes(user.role) && (
            <div className="card" onClick={() => navigate('/dashboard/employees')}>
              <h4>Employee List</h4>
              <p>View all employees</p>
            </div>
        )}
      </div>

      <div className="dashboard-main">
        <h1>Welcome, {user.fullname}!</h1>
        <p>Your role: {user.role}</p>
        <p>This is your dashboard. Use the left panel to navigate through actions.</p>
      </div>
    </div>
  );
};

export default Dashboard;

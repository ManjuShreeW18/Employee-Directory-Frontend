import React, { useEffect, useState } from 'react';
import api from '../api/api';

const EmployeeSummary = () => {
  // State to hold summary counts and employee lists
  const [summary, setSummary] = useState({
    totalActive: 0,
    totalInactive: 0,
    onLeave: 0,
    activeEmployees: [],
    inactiveEmployees: [],
    onLeaveEmployees: []
  });

  // Fetch summary data from API on component mount
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token'); // Get auth token
        const res = await api.get('Employee/summary', {
          headers: { Authorization: `Bearer ${token}` } // Include token in headers
        });
        setSummary(res.data); // Update state with summary data
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Employee Summary</h2>

      {/* Summary cards */}
      <div className="summary-cards">
        <div>Active Employees: {summary.totalActive}</div>
        <div>Inactive Employees: {summary.totalInactive}</div>
        <div>On Leave: {summary.onLeave}</div>
      </div>

      {/* Active Employees Table */}
      <h3>Active Employees</h3>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {(summary.activeEmployees || []).map(emp => (
            <tr key={emp.email}>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Inactive Employees Table */}
      <h3>Inactive Employees</h3>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {(summary.inactiveEmployees || []).map(emp => (
            <tr key={emp.email}>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* On Leave Employees Table */}
      <h3>On Leave Employees</h3>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {(summary.onLeaveEmployees || []).map(emp => (
            <tr key={emp.email}>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSummary;

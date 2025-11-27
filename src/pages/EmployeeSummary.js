import React, { useEffect, useState } from 'react';
import api from '../api/api';

const EmployeeSummary = () => {
  const [summary, setSummary] = useState({
    totalActive: 0,
    totalInactive: 0,
    onLeave: 0,
    activeEmployees: [],
    inactiveEmployees: [],
    onLeaveEmployees: []
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('Employee/summary', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSummary(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Employee Summary</h2>

      <div className="summary-cards">
        <div>Active Employees: {summary.totalActive}</div>
        <div>Inactive Employees: {summary.totalInactive}</div>
        <div>On Leave: {summary.onLeave}</div>
      </div>

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

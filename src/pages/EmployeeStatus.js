import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { ToastContainer, toast } from 'react-toastify';

const EmployeeStatus = () => {
  // State for employee details
  const [employee, setEmployee] = useState({ fullName: '', email: '', status: '' });
  // State for new selected status
  const [newStatus, setNewStatus] = useState('');

  // Fetch current employee data on component mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token'); // Get auth token
        const res = await api.get('Employee/me', {
          headers: { Authorization: `Bearer ${token}` } // Auth header
        });
        setEmployee(res.data); // Set employee info
        setNewStatus(res.data.status); // Initialize status dropdown
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch employee data'); // Show error toast
      }
    };
    fetchEmployee();
  }, []);

  // Update employee status
  const handleStatusChange = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(
        'Employee/status',
        JSON.stringify(newStatus), // Send new status
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setEmployee(prev => ({ ...prev, status: res.data.status })); // Update local state
      toast.success('Status updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status.');
    }
  };

  return (
    <div className="dashboard-statuses">
      <div className='dashboard-status'>
        <h1>My Status</h1>
        <p><strong>Name:</strong> {employee.fullName}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p>
          <strong>Status:</strong>
          {/* Dropdown to select status */}
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="Select Status" disabled>Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
        </p>
        <button onClick={handleStatusChange} style={{ padding: '8px 15px', marginTop: '10px' }}>
          Update Status
        </button>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EmployeeStatus;

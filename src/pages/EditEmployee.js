// src/pages/EditEmployee.jsx
import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../api/api";

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL
  const [employee, setEmployee] = useState(null); // Employee state

  // Fetch employee data on component mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/Employee/${id}`);
        console.log("Fetched employee:", response.data);
        setEmployee(response.data); // Set employee data
      } catch (err) {
        console.error("Error fetching employee:", err);
        toast.error("Failed to fetch employee data."); // Show error toast
      }
    };
    fetchEmployee();
  }, [id]);

  // Submit updated employee data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Employee/${Number(id)}`, employee); // Update employee
      console.log("Employee updated:", employee);
      toast.success("Employee updated successfully!"); // Success toast
    } catch (err) {
      console.error("Error updating employee:", err);
      toast.error("Failed to update employee."); // Error toast
    }
  };

  if (!employee) return <p>Loading employee data...</p>; // Show loading

  return (
    <div className="page-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form-container">
        {/* Employee form with editable fields */}
        <EmployeeForm 
          employee={employee} 
          setEmployee={setEmployee}
          showRequiredMark={true} 
        />
        <button type="submit">Update Employee</button>
      </form>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditEmployee;

// src/pages/ViewEmployee.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import api from "../api/api";
import { toast, ToastContainer } from "react-toastify";

const ViewEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL
  const [employee, setEmployee] = useState(null); // State for employee data

  // Fetch employee data on component mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        //calls api to get employee data
        const response = await api.get(`/Employee/${Number(id)}`);
        setEmployee(response.data); // Set employee state
      } catch (err) {
        console.error("Error fetching employee:", err);
        toast.error("Employee not found"); // Show error toast
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading employee data...</p>; // Loading state

  return (
    <div className="page-container">
      <h2>View Employee</h2>

      {/* Employee form in read-only mode */}
      <EmployeeForm
        employee={employee}
        setEmployee={() => {}}
        readOnly={true}
        showPassword={false} 
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ViewEmployee;

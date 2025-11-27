// src/pages/EditEmployee.jsx
import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../api/api";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/Employee/${id}`);
        console.log("Fetched employee:", response.data);
        setEmployee(response.data);
      } catch (err) {
        console.error("Error fetching employee:", err);
        toast.error("Failed to fetch employee data.");
      }
    };
    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Employee/${Number(id)}`, employee);
      console.log("Employee updated:", employee);
      toast.success("Employee updated successfully!");
    } catch (err) {
      console.error("Error updating employee:", err);
      toast.error("Failed to update employee.");
    }
  };

  if (!employee) return <p>Loading employee data...</p>;

  return (
    <div className="page-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form-container">
        <EmployeeForm 
        employee={employee} 
        setEmployee={setEmployee}
        showRequiredMark={true} 
        />
        <button type="submit">Update Employee</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditEmployee;

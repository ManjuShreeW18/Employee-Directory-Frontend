import React, { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { toast, ToastContainer } from "react-toastify";
import api from "../api/api";

const AddEmployee = () => {
  const initialEmployee = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth: "",
    dateOfJoining: "",
    location: "",
    designation: "",
    role: "",
    status: "",
    gender: "",
    currentAddress: "",
    nationality: "",
    maritalStatus: "",
    department: "",
  };

  const [employee, setEmployee] = useState(initialEmployee);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/Employee", employee);
      console.log("employee added :", response.data);
      toast.success(`Employee added successfully! ID: ${response.data.id}`);
      setEmployee(initialEmployee); // resets form
    } catch (err) {
      console.error("Error adding employee:", err);
      toast.error("Failed to add employee.");
    }
  };

  return (
    <div className="page-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form-container">
        <EmployeeForm 
        employee={employee} 
        setEmployee={setEmployee} 
        showRequiredMark={true}
        />
        <button type="submit">Add Employee</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddEmployee;

import React, { useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { toast, ToastContainer } from "react-toastify";
import api from "../api/api";

const AddEmployee = () => {
  // Initial state for employee form
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

  // State to store employee form data
  const [employee, setEmployee] = useState(initialEmployee);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Call API to add employee
      const response = await api.post("/Employee", employee);
      console.log("employee added :", response.data);

      // Show success notification
      toast.success(`Employee added successfully! ID: ${response.data.id}`);

      // Reset form after successful submission
      setEmployee(initialEmployee);
    } catch (err) {
      console.error("Error adding employee:", err);
      toast.error("Failed to add employee.");
    }
  };

  return (
    <div className="page-container">
      <h2>Add Employee</h2>

      {/* Employee form component */}
      <form onSubmit={handleSubmit} className="employee-form-container">
        <EmployeeForm 
          employee={employee} 
          setEmployee={setEmployee} 
          showRequiredMark={true} // Show * for required fields
        />
        <button type="submit">Add Employee</button>
      </form>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddEmployee;

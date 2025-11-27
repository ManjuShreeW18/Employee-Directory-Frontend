// src/pages/ViewEmployee.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeForm from "../components/EmployeeForm";
import api from "../api/api";
import { toast, ToastContainer } from "react-toastify";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(`/Employee/${Number(id)}`);
        setEmployee(response.data);
      } catch (err) {
        console.error("Error fetching employee:", err);
        toast.error("Employee not found");
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) return <p>Loading employee data...</p>;

  return (
    <div className="page-container">
      <h2>View Employee</h2>

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

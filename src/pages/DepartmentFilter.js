import React, { useState, useEffect, useContext } from "react";
import api from "../api/api"; 
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const DepartmentFilter = () => {
  const { user } = useContext(AuthContext); // get logged-in user

  const [employees, setEmployees] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [department, setDepartment] = useState(""); 

  const fetchDepartmentEmployees = async () => {
    if (!user) return;

    setLoading(true); 
    try {
      const res = await api.get(
        `/Employee/by-department${department ? `?department=${encodeURIComponent(department)}` : ""}`
      );
      setEmployees(res.data); 
    } catch (err) {
      console.error("Error fetching employees by department:", err);
      toast.error("Failed to fetch employees in this department.");
      setEmployees([]); // clear employees if error
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (user && user.role === "Employee") {
      fetchDepartmentEmployees();
    }
  }, [department, user]);

  if (!user || user.role !== "Employee") {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div className="employee-department-list">
      <h2>Employees in Department</h2>

      <label htmlFor="department">Select Department: </label>
      <select
        id="department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">{`-- Your Department (${user.department}) --`}</option>

        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="IT">IT</option>
        <option value="Testing">Testing</option>
        <option value="L&D">L&D</option>
        <option value="Management">Management</option>
      </select>

      {loading ? (
        <p>Loading employees...</p>
      ) : employees.length === 0 ? (
        <p>No employees found in this department.</p>
      ) : (
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Designation</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.fullName}</td>
                <td>{emp.email}</td>
                <td>{emp.designation}</td>
                <td>{emp.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DepartmentFilter;

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../api/api";

const EmployeeTable = ({ employees, page, setPage, pageSize = 10, totalCount = 0, refreshEmployees }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Ensure employees is always an array
  const safeEmployees = Array.isArray(employees) ? employees : [];

  // Calculate total number of pages for pagination
  const totalPages = Math.ceil(totalCount / pageSize);

  if (!user) return <p>Loading user info...</p>;

  // Delete an employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`/Employee/${id}`);
      toast.success("Employee Deleted Successfully");
      refreshEmployees(); // Refresh table after deletion
    } catch (err) {
      console.error("Error deleting employee:", err);
      toast.error("Failed to delete employee.");
    }
  };

  return (
    <div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DateOfBirth</th>
            <th>Location</th>
            <th>Designation</th>
            <th>Role</th>
            <th>DateOfJoining</th>
            <th>Status</th>
            <th>Gender</th>
            <th>Marital Status</th>

            {/* Only show Actions column if user is not an Employee */}
            {user.role !== "Employee" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {safeEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.dateOfBirth}</td>
              <td>{emp.location}</td>
              <td>{emp.designation}</td>
              <td>{emp.role}</td>
              <td>{emp.dateOfJoining}</td>
              <td>{emp.status}</td>
              <td>{emp.gender}</td>
              <td>{emp.maritalStatus}</td>

              {/* Role-based action buttons */}
              {user.role !== "Employee" && (
                <td className="action-icons">
                  <div className="icon-wrapper">
                    {/* View is allowed for all non-Employee roles */}
                    <VisibilityIcon
                      className="icon view"
                      onClick={() => navigate(`/view-employee/${emp.id}`)}
                    />

                    {/* Edit allowed for non-Employee roles */}
                    {user.role !== "Employee" && (
                      <EditIcon
                        className="icon edit"
                        onClick={() => navigate(`/edit-employee/${emp.id}`)}
                      />
                    )}

                    {/* Delete allowed only for HR */}
                    {user.role === "HR" && (
                      <DeleteIcon
                        className="icon delete"
                        onClick={() => handleDelete(emp.id)}
                      />
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination for non-Employee roles */}
      {user.role !== "Employee" && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      )}
    </div>
  );
};

export default EmployeeTable;

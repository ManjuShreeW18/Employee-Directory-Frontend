import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import EmployeeTable from "../components/EmployeeTable";
import { toast, ToastContainer } from "react-toastify";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const EmployeeList = () => {
  const { user } = useContext(AuthContext); // Logged-in user info
  const { id } = useParams(); // Optional: fetch single employee by ID
  const [allEmployees, setAllEmployees] = useState([]); // Full data set
  const [employees, setEmployees] = useState([]); // Current page data
  const [search, setSearch] = useState(""); // Search term
  const [page, setPage] = useState(1); // Current page number
  const [totalCount, setTotalCount] = useState(0); // Total number of employees
  const pageSize = 10; // Employees per page

  // Fetch employees based on role or ID
  const fetchEmployees = async () => {
    try {
      if (user.role === "Employee") {
        if (!user.employeeId) return;
        const res = await api.get(`/Employee/${user.employeeId}`);
        setAllEmployees([res.data]);
        setTotalCount(1);
      } else if (id) {
        const res = await api.get(`/Employee/${id}`);
        setAllEmployees([res.data]);
        setTotalCount(1);
      } else {
        const res = await api.get(`/Employee?pageNumber=1&pageSize=1000`);
        setAllEmployees(res.data.employees || res.data);
        setTotalCount(res.data.totalCount || res.data.length);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      toast.error("Failed to fetch employees."); // Show error toast
    }
  };

  // Filter and paginate employees when search or page changes
  useEffect(() => {
    let filtered = allEmployees;

    if (search) {
      filtered = allEmployees.filter(emp =>
        Object.values(emp).join(" ").toLowerCase().includes(search.toLowerCase())
      );
    }

    const startIndex = (page - 1) * pageSize;
    const pagedData = filtered.slice(startIndex, startIndex + pageSize);
    setEmployees(pagedData);
    setTotalCount(filtered.length);
  }, [search, page, allEmployees]);

  // Fetch employees initially and when user or id changes
  useEffect(() => {
    if (!user || !user.role) return;
    fetchEmployees();
  }, [user, id]);

  return (
    <div className="employee-container">
      <h2>Employee List</h2>

      {/* Search input */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Table with pagination */}
      <EmployeeTable
        employees={employees}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        totalCount={totalCount}
        refreshEmployees={fetchEmployees}
      />

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EmployeeList;

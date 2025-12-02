import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import ViewEmployee from "./pages/ViewEmployee";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeeSummary from "./pages/EmployeeSummary";
import EmployeeStatus from "./pages/EmployeeStatus";
import DepartmentFilter from "./pages/DepartmentFilter";

function App() {
  return (
    <AuthProvider> {/*To Provide logged-in user info to all components */}
      <Navbar /> {/* Top navigation bar */}

      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public login route */}
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Employee list, accessible by Manager, HR, Employee */}
        <Route 
          path="/dashboard/employees" 
          element={
            <ProtectedRoute roles={["Manager", "HR", "Employee"]}>
              <EmployeeList />
            </ProtectedRoute>
          } 
        />

        {/* Add employee, HR only */}
        <Route 
          path="/add-employee" 
          element={
            <ProtectedRoute roles={["HR"]}>
              <AddEmployee />
            </ProtectedRoute>
          } 
        />

        {/* Edit employee, HR & Manager */}
        <Route 
          path="/edit-employee/:id" 
          element={
            <ProtectedRoute roles={["HR", "Manager"]}>
              <EditEmployee />
            </ProtectedRoute>
          } 
        />

        {/* View employee, Employee, Manager & HR */}
        <Route 
          path="/view-employee/:id" 
          element={
            <ProtectedRoute roles={["Employee", "Manager", "HR"]}>
              <ViewEmployee />
            </ProtectedRoute>
          } 
        />

        {/* Employee summary, HR only */}
        <Route 
          path="/employee-summary" 
          element={
            <ProtectedRoute roles={["HR"]}>
              <EmployeeSummary />
            </ProtectedRoute>
          } 
        />

        {/* Employee status, accessible by HR, Manager, Employee */}
        <Route 
          path="/employee-status" 
          element={
            <ProtectedRoute roles={["HR","Employee","Manager"]}>
              <EmployeeStatus />
            </ProtectedRoute>
          } 
        />

        {/* Department filter, Employee & Manager */}
        <Route 
          path="/search-department" 
          element={
            <ProtectedRoute roles={["Employee","Manager"]}>
              <DepartmentFilter />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;

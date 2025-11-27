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
    <AuthProvider>
      <Navbar title="|&nbsp; Employee Directory App" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/dashboard/employees" 
          element={
            <ProtectedRoute roles={["Manager", "HR", "Employee"]}>
              <EmployeeList />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/add-employee" 
          element={
            <ProtectedRoute roles={["HR"]}>
              <AddEmployee />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/edit-employee/:id" 
          element={
            <ProtectedRoute roles={["HR", "Manager"]}>
              <EditEmployee />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/view-employee/:id" 
          element={
            <ProtectedRoute roles={["Employee", "Manager", "HR"]}>
              <ViewEmployee />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/employee-summary" 
          element={
            <ProtectedRoute roles={["HR"]}>
              <EmployeeSummary />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/employee-status" 
          element={
            <ProtectedRoute roles={["Employee","Manager"]}>
              <EmployeeStatus />
            </ProtectedRoute>
          } 
        />

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

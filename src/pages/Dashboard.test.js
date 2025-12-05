import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { AuthContext } from "../context/AuthContext";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Dashboard Component", () => {
  const renderDashboard = (role = "Employee") => {
    const user = {
      role,
      fullname: "John Doe",
      id: 1,
      employeeId: 123,
    };

    render(
      <AuthContext.Provider value={{ user }}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </AuthContext.Provider>
    );

    return { user };
  };

  it("renders welcome message with user's name and role", () => {
    renderDashboard("Employee");

    expect(screen.getByText(/Welcome, John Doe!/i)).toBeInTheDocument();
    expect(screen.getByText(/Your role: Employee/i)).toBeInTheDocument();
  });

  it("shows Employee-specific actions", () => {
    renderDashboard("Employee");

    expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Update Status/i)).toBeInTheDocument();
    expect(screen.getByText(/View by Department/i)).toBeInTheDocument();
    // Employee should not see HR actions
    expect(screen.queryByText(/Add Employee/i)).toBeNull();
  });

  it("shows HR-specific actions", () => {
    renderDashboard("HR");

    expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Update Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Employee/i)).toBeInTheDocument();
    expect(screen.getByText(/Employee List/i)).toBeInTheDocument();
  });

  it("navigates to correct route when card clicked", () => {
    renderDashboard("Employee");

    const profileCard = screen.getByText(/My Profile/i).closest("div");
    fireEvent.click(profileCard);

    expect(mockNavigate).toHaveBeenCalledWith("/view-employee/123");
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock the AuthContext and ProtectedRoute
jest.mock("./context/AuthContext", () => ({
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock("./components/ProtectedRoute", () => ({ children }) => (
  <div>{children}</div>
));

// Mock all pages
jest.mock("./pages/Login", () => () => <div>Login Page</div>);
jest.mock("./pages/Dashboard", () => () => <div>Dashboard Page</div>);
jest.mock("./pages/EmployeeList", () => () => <div>EmployeeList Page</div>);
jest.mock("./pages/AddEmployee", () => () => <div>AddEmployee Page</div>);
jest.mock("./pages/EditEmployee", () => () => <div>EditEmployee Page</div>);
jest.mock("./pages/ViewEmployee", () => () => <div>ViewEmployee Page</div>);
jest.mock("./pages/EmployeeSummary", () => () => <div>EmployeeSummary Page</div>);
jest.mock("./pages/EmployeeStatus", () => () => <div>EmployeeStatus Page</div>);
jest.mock("./pages/DepartmentFilter", () => () => <div>DepartmentFilter Page</div>);

// Mock Navbar
jest.mock("./components/Navbar", () => () => <div>Navbar</div>);

describe("App Component", () => {
  test("renders Login page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.getByText("Navbar")).toBeInTheDocument();
  });

  test("renders Dashboard page on /dashboard route", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
  });

  test("renders EmployeeList page on /dashboard/employees route", () => {
    render(
      <MemoryRouter initialEntries={["/dashboard/employees"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("EmployeeList Page")).toBeInTheDocument();
  });

  test("renders AddEmployee page on /add-employee route", () => {
    render(
      <MemoryRouter initialEntries={["/add-employee"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("AddEmployee Page")).toBeInTheDocument();
  });

  test("renders EditEmployee page on /edit-employee/:id route", () => {
    render(
      <MemoryRouter initialEntries={["/edit-employee/1"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("EditEmployee Page")).toBeInTheDocument();
  });

  test("renders ViewEmployee page on /view-employee/:id route", () => {
    render(
      <MemoryRouter initialEntries={["/view-employee/1"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("ViewEmployee Page")).toBeInTheDocument();
  });

  test("renders EmployeeSummary page on /employee-summary route", () => {
    render(
      <MemoryRouter initialEntries={["/employee-summary"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("EmployeeSummary Page")).toBeInTheDocument();
  });

  test("renders EmployeeStatus page on /employee-status route", () => {
    render(
      <MemoryRouter initialEntries={["/employee-status"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("EmployeeStatus Page")).toBeInTheDocument();
  });

  test("renders DepartmentFilter page on /search-department route", () => {
    render(
      <MemoryRouter initialEntries={["/search-department"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("DepartmentFilter Page")).toBeInTheDocument();
  });
});

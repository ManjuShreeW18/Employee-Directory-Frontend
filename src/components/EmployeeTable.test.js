import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import { toast } from "react-toastify";

// Mock navigation
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock API + Toast
jest.mock("../api/api");
jest.mock("react-toastify", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

// Mock employees
const mockEmployees = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@test.com",
    phone: "123456789",
    dateOfBirth: "1990-01-01",
    location: "NY",
    designation: "Developer",
    role: "Employee",
    dateOfJoining: "2020-01-01",
    status: "Active",
    gender: "Male",
    maritalStatus: "Single",
  },
];

// Helper render function
const renderTable = (role = "HR", refreshMock = () => {}) => {
  return render(
    <AuthContext.Provider value={{ user: { role } }}>
      <BrowserRouter>
        <EmployeeTable
          employees={mockEmployees}
          page={1}
          setPage={() => {}}
          pageSize={10}
          totalCount={1}
          refreshEmployees={refreshMock}
        />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

describe("EmployeeTable Component", () => {
  test("renders employee data", () => {
    renderTable();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
  });

  test("HR sees all action buttons", () => {
    renderTable("HR");

    expect(screen.getByTestId("VisibilityIcon")).toBeInTheDocument();
    expect(screen.getByTestId("EditIcon")).toBeInTheDocument();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();
  });

  test("Employee role does NOT see action buttons", () => {
    renderTable("Employee");

    expect(screen.queryByTestId("VisibilityIcon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("EditIcon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("DeleteIcon")).not.toBeInTheDocument();
  });

  test("View button navigates correctly", () => {
    renderTable("HR");

    fireEvent.click(screen.getByTestId("VisibilityIcon"));
    expect(mockNavigate).toHaveBeenCalledWith("/view-employee/1");
  });

  test("Edit button navigates correctly", () => {
    renderTable("HR");

    fireEvent.click(screen.getByTestId("EditIcon"));
    expect(mockNavigate).toHaveBeenCalledWith("/edit-employee/1");
  });

  test("Delete calls API delete, shows toast, refreshes list", async () => {
    api.delete.mockResolvedValue({ data: {} });
    window.confirm = jest.fn(() => true);

    const refreshMock = jest.fn();

    renderTable("HR", refreshMock);

    fireEvent.click(screen.getByTestId("DeleteIcon"));

    await waitFor(() => {
      expect(api.delete).toHaveBeenCalledWith("/Employee/1");
      expect(toast.success).toHaveBeenCalled();
      expect(refreshMock).toHaveBeenCalled();
    });
  });

  test("pagination renders for non-employee", () => {
    renderTable("HR");

    expect(screen.getByRole("button", { name: /page 1/i })).toBeInTheDocument();
  });

  test("pagination hidden for Employee role", () => {
    renderTable("Employee");

    expect(
      screen.queryByRole("button", { name: /page 1/i })
    ).not.toBeInTheDocument();
  });
});
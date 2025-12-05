import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../context/AuthContext";

const TestComponent = () => <div>Protected Content</div>;

describe("ProtectedRoute Component", () => {
  test("redirects to /login if user is not logged in", () => {
    render(
      <AuthContext.Provider value={{ user: null }}>
        <MemoryRouter initialEntries={["/protected"]}>
          <ProtectedRoute>
            <TestComponent />
          </ProtectedRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Should not render protected content
    expect(screen.queryByText(/Protected Content/i)).not.toBeInTheDocument();
  });

  test("renders children if user is logged in and role allowed", () => {
    const mockUser = { fullname: "John Doe", role: "Admin" };

    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <MemoryRouter>
          <ProtectedRoute roles={["Admin", "Manager"]}>
            <TestComponent />
          </ProtectedRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Should render protected content
    expect(screen.getByText(/Protected Content/i)).toBeInTheDocument();
  });

  test("redirects to /dashboard if user role not allowed", () => {
    const mockUser = { fullname: "Jane Doe", role: "Employee" };

    render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <MemoryRouter initialEntries={["/protected"]}>
          <ProtectedRoute roles={["Admin", "Manager"]}>
            <TestComponent />
          </ProtectedRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Should not render protected content
    expect(screen.queryByText(/Protected Content/i)).not.toBeInTheDocument();
  });
});

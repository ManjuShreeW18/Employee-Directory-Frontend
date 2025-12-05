import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

const mockUser = { fullname: "John Doe", role: "Admin" };

describe("Navbar Component", () => {
  test("shows user info when logged in", () => {
    // Mock localStorage token
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('mock-token');

    render(
      <AuthContext.Provider value={{ user: mockUser, logout: jest.fn() }}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Match full name text
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();

    // Dashboard button should exist
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();

    // Logout button should exist
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("shows login link when not logged in", () => {
    // Mock no token in localStorage
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    render(
      <AuthContext.Provider value={{ user: null, logout: jest.fn() }}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Login link exists (even if empty text, check by href)
    const loginLink = screen.getByRole("link");
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});

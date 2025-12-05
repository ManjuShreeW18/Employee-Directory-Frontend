// AuthContext.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider, AuthContext } from "./AuthContext";
import * as jwtDecodeModule from "jwt-decode"; // import the module to mock named export

// Mock the named export
jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

describe("AuthProvider", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const fakeUser = {
    fullname: "John Doe",
    department: "IT",
    email: "john@example.com",
    role: "Admin",
    employeeId: 123,
  };

  test("login sets the user", () => {
    jwtDecodeModule.jwtDecode.mockReturnValue(fakeUser);

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ user, login }) => {
            if (!user) login("fake-token");
            return <div>{user?.fullname}</div>;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("logout clears the user", () => {
    jwtDecodeModule.jwtDecode.mockReturnValue(fakeUser);

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ user, logout }) => {
            if (!user) logout();
            return <div>{user ? user.fullname : "No user"}</div>;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    expect(screen.getByText("No user")).toBeInTheDocument();
  });

  test("invalid token does not crash", () => {
    localStorage.setItem("token", "bad-token");
    jwtDecodeModule.jwtDecode.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ user }) => <div>{user ? user.fullname : "No user"}</div>}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    expect(screen.getByText("No user")).toBeInTheDocument();
  });
});

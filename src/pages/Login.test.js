import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

// Correct import for your structure
import Login from "./Login";

import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock API
jest.mock("../api/api");

describe("Login Component", () => {
  const mockLogin = jest.fn();

  const renderLogin = () =>
    render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );

  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockReset();
    mockLogin.mockReset();
  });

  test("renders login form", () => {
    renderLogin();
    expect(screen.getByText("LOGIN")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("allows user to type in username and password", () => {
    renderLogin();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "john" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "12345" },
    });

    expect(screen.getByLabelText("Username").value).toBe("john");
    expect(screen.getByLabelText("Password").value).toBe("12345");
  });

  test("redirects to dashboard if token exists", () => {
    localStorage.setItem("token", "abc123");
    renderLogin();
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard", { replace: true });
  });

  test("successful login calls API, login(), and navigates", async () => {
    api.post.mockResolvedValue({ data: { token: "fakeToken123" } });

    renderLogin();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("Login/Login", {
        Username: "admin",
        Password: "password",
      });
      expect(mockLogin).toHaveBeenCalledWith("fakeToken123");
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard", { replace: true });
    });
  });

  test("shows error message on failed login", async () => {
    api.post.mockRejectedValue({
      response: { data: "Invalid credentials" },
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "wrong" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrong" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  test("shows default error if no server error message", async () => {
    api.post.mockRejectedValue({});

    renderLogin();

    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "any" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "any" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText("Login failed")).toBeInTheDocument();
    });
  });
});
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import LoginForm from "../components/LoginForm";

describe("LoginForm Component", () => {
  it("renders the login form", () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByText("Submit");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("displays error message for invalid email", async () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Email:");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email format")).toBeInTheDocument();
    });
  });

  it("displays error message for empty email", async () => {
    render(<LoginForm />);
    const emailInput = screen.getByLabelText("Email:");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  it("displays error message for short password", async () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(passwordInput, { target: { value: "short" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters")
      ).toBeInTheDocument();
    });
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextField } from "./TextField";

describe("TextField", () => {
    test("renders with label", () => {
        render(<TextField label="Username" />);
        expect(screen.getByLabelText("Username")).toBeInTheDocument();
    });

    test("renders with placeholder", () => {
        render(<TextField label="Email" placeholder="Enter your email" />);
        expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    });

    test("handle input change", () => {
        const handleChange = jest.fn();
        render(<TextField label="Password" onChange={handleChange} />);
        const input = screen.getByLabelText("Password");
        fireEvent.change(input, { target: { value: "secret" } });
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(input).toHaveValue("secret");
    });

    test("displays error message and set aria-invalid", () => {
        render(<TextField label="Age" errorMessage="Invalid age" />);
        expect(screen.getByText("Invalid age")).toBeInTheDocument();

        const inputElement = screen.getByLabelText("Age");
        expect(inputElement).toHaveAttribute("aria-invalid", "true");

        expect(inputElement).toHaveAttribute("aria-describedby");
        const errorElement = screen.getByText("Invalid age");
        expect(errorElement).toHaveAttribute("role", "alert");
    });

    test("applies disabled state", () => {
        render(<TextField label="Country" disabled />);
        const input = screen.getByLabelText("Country");
        expect(input).toBeDisabled();
        expect(input).toHaveAttribute("aria-disabled", "true");
    });

    test("applies readOnly state", () => {
        render(<TextField label="ReadyOnly" readOnly />);
        expect(screen.getByLabelText("ReadyOnly")).toHaveAttribute("readonly");
    });

    test("applies required attribute", () => {
        render(<TextField label="Required" required />);
        expect(screen.getByLabelText("Required")).toBeRequired();
    });

    test("applies autoComplete attribute", () => {
        render(<TextField label="AutoComplete" autoComplete="username" />);
        expect(screen.getByLabelText("AutoComplete")).toHaveAttribute("autocomplete", "username");
    });

    test("applies custom className", () => {
        render(<TextField label="Custom Class" className="my-custom-class" />);
        expect(screen.getByLabelText("Custom Class")).toHaveClass("my-custom-class");
    });

    test("handle controlled value", () => {
        const { rerender } = render(<TextField label="Controlled" value="initial" />);
        expect(screen.getByLabelText("Controlled")).toHaveValue("initial");

        rerender(<TextField label="Controlled" value="updated" />);
        expect(screen.getByLabelText("Controlled")).toHaveValue("updated");
    });

    test("handle uncontrolled value with defaultValue", () => {
        render(<TextField label="Uncontrolled" defaultValue="default" />);
        expect(screen.getByLabelText("Uncontrolled")).toHaveValue("default");
    });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Dropdown } from "./Dropdown";

describe("Dropdown Component", () => {
    const options = [
        { value: "option 1", disabled: false },
        { value: "option 2", disabled: false },
        { value: "option 3", disabled: true },
        { value: "option 4", disabled: false },
        { value: "option 5", disabled: false },
    ];

    const renderDropdown = (onSelect?: (value: string | null) => void) => {
        return render(
            <Dropdown onSelect={onSelect}>
                <Dropdown.Trigger>Select an option</Dropdown.Trigger>
                <Dropdown.List>
                    {options.map((option) => (
                        <Dropdown.Option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.value}
                        </Dropdown.Option>
                    ))}
                </Dropdown.List>
            </Dropdown>
        );
    };

    test("renders correctly", () => {
        renderDropdown();
        expect(screen.getByRole("button")).toHaveTextContent("Select an option");
    });

    test("opens and closes dropdown", () => {
        renderDropdown();
        const triggerButton = screen.getByRole("button");

        // Open dropdown
        fireEvent.click(triggerButton);
        expect(screen.getByRole("listbox")).toBeInTheDocument();

        // Close dropdown
        fireEvent.click(triggerButton);
        expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    test("selects an option", () => {
        const handleSelect = jest.fn();
        renderDropdown(handleSelect);
        const triggerButton = screen.getByRole("button");

        // Open dropdown
        fireEvent.click(triggerButton);

        // Select an option
        const option = screen.getByText("option 2");
        fireEvent.click(option);

        expect(handleSelect).toHaveBeenCalledWith("option 2");
        expect(triggerButton).toHaveTextContent("option 2");
    });

    test("does not select a disabled option", () => {
        const handleSelect = jest.fn();
        renderDropdown(handleSelect);
        const triggerButton = screen.getByRole("button");

        // Open dropdown
        fireEvent.click(triggerButton);

        // Try to select a disabled option
        const option = screen.getByText("option 3");
        fireEvent.click(option);

        expect(handleSelect).not.toHaveBeenCalled();
        expect(triggerButton).toHaveTextContent("Select an option");
    });

    test("keyboard navigation works", () => {
        renderDropdown();
        const triggerButton = screen.getByRole("button");

        // Open dropdown with keyboard
        fireEvent.keyDown(triggerButton, { key: "ArrowDown" });

        const firstOption = screen.getByText("option 1");

        // Navigate with keyboard
        fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
        fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
        fireEvent.keyDown(document.activeElement!, { key: "Enter" });

        expect(triggerButton).toHaveTextContent("option 4");
    });

    test("accessibility checks", () => {
        renderDropdown();
        const triggerButton = screen.getByRole("button");

        // Open dropdown
        fireEvent.click(triggerButton);

        const listbox = screen.getByRole("listbox");
        expect(listbox).toBeInTheDocument();
        expect(triggerButton).toHaveAttribute("aria-expanded", "true");

        const options = screen.getAllByRole("option");
        options.forEach((option) => {
            expect(option).toHaveAttribute("tabindex", "-1");
        });

        // Close dropdown
        fireEvent.click(triggerButton);
        expect(triggerButton).toHaveAttribute("aria-expanded", "false");
    });
});

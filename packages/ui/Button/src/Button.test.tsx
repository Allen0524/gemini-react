import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button", () => {
    test("renders with text", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    test("is disabled when disabled prop is true", () => {
        render(<Button disabled>Disabled</Button>);
        expect(screen.getByText("Disabled")).toBeDisabled();
    });

    test("calls onClick when clicked", () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        fireEvent.click(screen.getByText("Click me"));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test("does not call onClick when disabled", () => {
        const handleClick = jest.fn();
        render(
            <Button onClick={handleClick} disabled>
                Click me
            </Button>
        );
        fireEvent.click(screen.getByText("Click me"));
        expect(handleClick).not.toHaveBeenCalled();
    });

    test("applies custom className", () => {
        render(<Button className="custom-class">Custom Class</Button>);
        expect(screen.getByText("Custom Class")).toHaveClass("custom-class");
    });
});

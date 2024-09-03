import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Carousel } from "./Carousel";
import { useCarousel } from "./hook";

const mockItems = [
    { id: 1, content: <div>Slide 1</div> },
    { id: 2, content: <div>Slide 2</div> },
    { id: 3, content: <div>Slide 3</div> },
];

describe("Carousel Component", () => {
    test("renders without crashing", () => {
        render(<Carousel items={mockItems} />);
        expect(screen.getByTestId("slide-1")).toHaveAttribute("aria-hidden", "false");
        expect(screen.getByTestId("slide-2")).toHaveAttribute("aria-hidden", "true");
        expect(screen.getByTestId("slide-3")).toHaveAttribute("aria-hidden", "true");
    });

    test("changes slide when next button is clicked", () => {
        render(<Carousel items={mockItems} />);
        const nextButton = screen.getByLabelText("Next slide");
        fireEvent.click(nextButton);
        expect(screen.getByTestId("slide-1")).toHaveAttribute("aria-hidden", "true");
        expect(screen.getByTestId("slide-2")).toHaveAttribute("aria-hidden", "false");
        expect(screen.getByTestId("slide-3")).toHaveAttribute("aria-hidden", "true");
    });

    test("changes slide when previous button is clicked", () => {
        render(<Carousel items={mockItems} />);
        const nextButton = screen.getByLabelText("Previous slide");
        fireEvent.click(nextButton);
        expect(screen.getByTestId("slide-1")).toHaveAttribute("aria-hidden", "true");
        expect(screen.getByTestId("slide-2")).toHaveAttribute("aria-hidden", "true");
        expect(screen.getByTestId("slide-3")).toHaveAttribute("aria-hidden", "false");
    });

    test("auto-plays when autoPlay prop is true", () => {
        render(<Carousel items={mockItems} autoPlay={true} interval={1000} />);
        expect(screen.getByTestId("slide-1")).toHaveAttribute("aria-hidden", "false");

        waitFor(() => {
            expect(screen.getByTestId("slide-1")).toHaveAttribute("aria-hidden", "true");
            expect(screen.getByTestId("slide-2")).toHaveAttribute("aria-hidden", "false");
        });
    });

    test("pause auto-play on mouse enter and resumes on mouse leave", async () => {
        render(<Carousel items={mockItems} autoPlay={true} interval={1000} />);
        const carousel = screen.getByRole("region");
        fireEvent.mouseEnter(carousel);

        waitFor(() => {
            expect(screen.getByTestId("slide-1")).toHaveAttribute("aria-hidden", "false");
        });
        fireEvent.mouseLeave(carousel);

        waitFor(() => {
            expect(screen.getByTestId("slide-2")).toHaveAttribute("aria-hidden", "false");
        });
    });

    test("changes slide when indicator is clicked", () => {
        render(<Carousel items={mockItems} />);
        const indicators = screen.getAllByRole("button", { name: /Go to slide/ });

        const secondIndicator = indicators[1];
        if (secondIndicator) {
            fireEvent.click(secondIndicator);
            expect(screen.getByText(`Slide 2`)).not.toHaveAttribute("aria-hidden", "true");
        }
    });
});

describe("useCarousel Hook", () => {
    const TextComponent = ({
        itemCount,
        autoPlay,
        interval,
    }: {
        itemCount: number;
        autoPlay?: boolean;
        interval?: number;
    }) => {
        const { currentIndex, goToNext, goToPrevious, goToIndex, pauseAutoPlay, resumeAutoPlay } =
            useCarousel({
                itemCount,
                autoPlay,
                interval,
            });
        return (
            <div>
                <span data-testid="current-index">{currentIndex}</span>
                <button onClick={goToNext}>Next</button>
                <button onClick={goToPrevious}>Previous</button>
                <button onClick={() => goToIndex(2)}>Go to 2</button>
                <button onClick={pauseAutoPlay}>Pause</button>
                <button onClick={resumeAutoPlay}>Resume</button>
            </div>
        );
    };

    test("initializes with correct current index", () => {
        render(<TextComponent itemCount={3} />);
        expect(screen.getByTestId("current-index")).toHaveTextContent("0");
    });

    test("goToNext increments the index", () => {
        render(<TextComponent itemCount={3} />);
        fireEvent.click(screen.getByText("Next"));
        expect(screen.getByTestId("current-index")).toHaveTextContent("1");
    });

    test("goToPrevious decrements the index", () => {
        render(<TextComponent itemCount={3} />);
        fireEvent.click(screen.getByText("Previous"));
        expect(screen.getByTestId("current-index")).toHaveTextContent("2");
    });

    test("goToIndex sets the correct index", () => {
        render(<TextComponent itemCount={3} />);
        fireEvent.click(screen.getByText("Go to 2"));
        expect(screen.getByTestId("current-index")).toHaveTextContent("2");
    });
});

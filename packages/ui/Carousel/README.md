# Carousel

A feature-rich, accessible React carousel component.

## Features

-   Support both auto-play and manual control
-   Fully accessible, compliant with WCAG 2.1 standards
-   Keyboard navigation support
-   Headless option for complete UI control

## Usage

### Basic usage:

```tsx
import { Carousel } from "@gemini-react/carousel";

const items = [
    { id: 1, content: <img src="image1.png" alt="Slide 1" /> },
    { id: 2, content: <img src="image2.png" alt="Slide 2" /> },
    { id: 3, content: <img src="image3.png" alt="Slide 3" /> },
];

<Carousel items={items} autoPlay={true} interval={5000} label="Featured Carousel" />;
```

### Headless usage:

```tsx
import {
    useCarousel,
    getCarouselProps,
    getCarouselContentProps,
    getCarouselItemProps,
    getCarouselControlProps,
    getCarouselIndicatorProps,
} from "@gemini-react/carousel";

const items = [
    { id: 1, content: <img src="image1.png" alt="Slide 1" /> },
    { id: 2, content: <img src="image2.png" alt="Slide 2" /> },
    { id: 3, content: <img src="image3.png" alt="Slide 3" /> },
];

function App() {
    const {
        currentIndex,
        goToNext,
        goToPrevious,
        goToIndex,
        isAutoPlayEnabled,
        toggleAutoPlay,
        handleFocus,
        handleBlur,
        handleMouseEnter,
        handleMouseLeave,
    } = useCarousel({ itemCount: 3, autoPlay: true, interval: 5000 });

    return (
        <div>
            <button onClick={toggleAutoPlay}>{isAutoPlayEnabled ? "Pause" : "Play"}</button>
            <div>{items[currentIndex].content}</div>
            <button onClick={goToPrevious}>Previous</button>
            <button onClick={goToNext}>Next</button>
            {items.map((item, index) => (
                <button key={item.id} onClick={() => goToIndex(index)}>
                    {index + 1}
                </button>
            ))}
        </div>
    );
}
```

## Props

| Prop     | Type             | Default            | Description                          |
| -------- | ---------------- | ------------------ | ------------------------------------ |
| items    | `CarouselItem[]` | `[]`               | The items to display in the carousel |
| autoPlay | boolean          | true               | Enable auto-play                     |
| interval | number           | 3000               | Auto-play interval in milliseconds   |
| label    | string           | 'example carousel' | Accessibility label for the carousel |

## Accessibility

-   Uses appropriate ARIA attributes (`aria-live`, `aria-roledescription`, etc.)
-   Supports keyboard navigation
-   Allows pausing of auto-play

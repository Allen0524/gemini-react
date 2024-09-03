# Carousel

A feature-rich, accessible React carousel component.

## Features

-   Support both auto-play and manual control
-   Fully accessible, compliant with WCAG 2.1 standards
-   Keyboard navigation support

## Usage

Basic usage:

```tsx
import { Carousel } from "@your-org/carousel";

const items = [
    { id: 1, content: <img src="image1.png" alt="Slide 1" /> },
    { id: 2, content: <img src="image2.png" alt="Slide 2" /> },
    { id: 3, content: <img src="image3.png" alt="Slide 3" /> },
];

<Carousel items={items} autoPlay={true} interval={5000} label="Featured Carousel" />;
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

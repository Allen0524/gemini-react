import * as React from "react";
import { carouselStyles } from "./style.css";
import { useCarousel } from "./hook";
import {
    getCarouselControlProps,
    getCarouselItemProps,
    getCarouselIndicatorProps,
} from "./accessibility";

interface CarouselItem {
    id: string | number;
    content: React.ReactNode;
}

interface CarouselProps {
    items: CarouselItem[];
    autoPlay?: boolean;
    interval?: number;
}

const Carousel = ({ items, autoPlay, interval }: CarouselProps) => {
    const itemCount = items.length;
    const { currentIndex, goToNext, goToPrevious, goToIndex, pauseAutoPlay, resumeAutoPlay } =
        useCarousel({
            itemCount,
            autoPlay,
            interval,
        });

    return (
        <div
            role="region"
            onMouseEnter={pauseAutoPlay}
            onMouseLeave={resumeAutoPlay}
            aria-roledescription="acrousel"
            className={carouselStyles.container}
        >
            <CarouselContent items={items} currentIndex={currentIndex} />
            <CarouselControls onPrevious={goToPrevious} onNext={goToNext} />
            <CarouselIndicators
                itemCount={itemCount}
                currentIndex={currentIndex}
                onSelect={goToIndex}
            />
        </div>
    );
};

interface CarouselContentProps {
    items: CarouselItem[];
    currentIndex: number;
}

const CarouselContent = ({ items, currentIndex }: CarouselContentProps) => {
    return (
        <div
            className={carouselStyles.content}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={carouselStyles.item}
                    data-testid={`slide-${index + 1}`}
                    {...getCarouselItemProps(index, currentIndex)}
                >
                    {item.content}
                </div>
            ))}
        </div>
    );
};

interface CarouselControlsProps {
    onPrevious: () => void;
    onNext: () => void;
}

const CarouselControls = ({ onPrevious, onNext }: CarouselControlsProps) => {
    return (
        <div className={carouselStyles.controls}>
            <button
                {...getCarouselControlProps("Previous slide")}
                className={carouselStyles.controlsButton}
                onClick={onPrevious}
            >
                &lt;
            </button>
            <button
                {...getCarouselControlProps("Next slide")}
                className={carouselStyles.controlsButton}
                onClick={onNext}
            >
                &gt;
            </button>
        </div>
    );
};

interface CarouselIndicatorsProps {
    itemCount: number;
    currentIndex: number;
    onSelect: (index: number) => void;
}

const CarouselIndicators = ({ itemCount, currentIndex, onSelect }: CarouselIndicatorsProps) => {
    return (
        <div className={carouselStyles.indicators}>
            {Array.from({ length: itemCount }).map((_, index) => (
                <button
                    key={index}
                    {...getCarouselIndicatorProps(index, currentIndex)}
                    className={`${carouselStyles.indicator} ${index === currentIndex ? carouselStyles.activeIndicator : ""}`}
                    onClick={() => onSelect(index)}
                ></button>
            ))}
        </div>
    );
};

export { Carousel };

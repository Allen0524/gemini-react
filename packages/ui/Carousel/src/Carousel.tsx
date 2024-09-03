import * as React from "react";
import { carouselStyles } from "./style.css";
import { useCarousel } from "./hook";
import {
    getCarouselProps,
    getCarouselContentProps,
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
    label?: string;
}

const Carousel = ({ items, autoPlay, interval, label = "example carousel" }: CarouselProps) => {
    const itemCount = items.length;
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
    } = useCarousel({
        itemCount,
        autoPlay,
        interval,
    });

    return (
        <>
            <button
                onClick={toggleAutoPlay}
                aria-label={isAutoPlayEnabled ? "Pause auto-play" : "Start auto-play"}
            >
                {isAutoPlayEnabled ? "Pause" : "Start"} Auto-play
            </button>
            <div
                {...getCarouselProps(label)}
                className={carouselStyles.container}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                <CarouselContent
                    items={items}
                    currentIndex={currentIndex}
                    isAutoPlayEnabled={isAutoPlayEnabled}
                />
                <CarouselControls onPrevious={goToPrevious} onNext={goToNext} />
                <CarouselIndicators
                    itemCount={itemCount}
                    currentIndex={currentIndex}
                    onSelect={goToIndex}
                />
            </div>
        </>
    );
};

interface CarouselContentProps {
    items: CarouselItem[];
    currentIndex: number;
    isAutoPlayEnabled: boolean;
}

const CarouselContent = ({ items, currentIndex, isAutoPlayEnabled }: CarouselContentProps) => {
    return (
        <div
            id="carousel-content"
            {...getCarouselContentProps(isAutoPlayEnabled)}
            className={carouselStyles.content}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={carouselStyles.item}
                    data-testid={`slide-${index + 1}`}
                    {...getCarouselItemProps(index, currentIndex, items.length)}
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
                {...getCarouselControlProps("Previous slide", "carousel-content")}
                className={carouselStyles.controlsButton}
                onClick={onPrevious}
            >
                &lt;
            </button>
            <button
                {...getCarouselControlProps("Next slide", "carousel-content")}
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

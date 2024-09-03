import { useState, useCallback, useEffect, useRef } from "react";

interface UseCarouselProps {
    itemCount: number;
    autoPlay?: boolean;
    interval?: number;
}

const useCarousel = ({ itemCount, autoPlay = true, interval = 3000 }: UseCarouselProps) => {
    const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(autoPlay);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount);
    }, [itemCount]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount);
    }, [itemCount]);

    const goToIndex = useCallback((index: number) => {
        setCurrentIndex(index);
    }, []);

    const toggleAutoPlay = useCallback(() => {
        setIsAutoPlayEnabled((prev) => !prev);
    }, []);

    const handleFocus = useCallback(() => setIsFocused(true), []);
    const handleBlur = useCallback(() => setIsFocused(false), []);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        const shouldPlay = isAutoPlayEnabled && !isFocused && !isHovered;

        if (shouldPlay) {
            timerRef.current = setInterval(goToNext, interval);
        } else if (timerRef.current) {
            clearTimer();
        }

        return clearTimer;
    }, [goToNext, interval, clearTimer, isAutoPlayEnabled, isFocused, isHovered]);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setIsAutoPlayEnabled(false);
        }
    }, []);

    return {
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
    };
};

export { useCarousel };

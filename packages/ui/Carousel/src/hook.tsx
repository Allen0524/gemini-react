import { useState, useCallback, useEffect, useRef } from "react";

interface UseCarouselProps {
    itemCount: number;
    autoPlay?: boolean;
    interval?: number;
}

const useCarousel = ({ itemCount, autoPlay = true, interval = 3000 }: UseCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
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

    const pauseAutoPlay = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const resumeAutoPlay = useCallback(() => {
        if (autoPlay) {
            setIsPlaying(true);
        }
    }, [autoPlay]);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(goToNext, interval);
        } else if (timerRef.current) {
            clearTimer();
        }

        return clearTimer;
    }, [isPlaying, goToNext, interval, clearTimer]);

    return {
        currentIndex,
        goToNext,
        goToPrevious,
        goToIndex,
        pauseAutoPlay,
        resumeAutoPlay,
        isPlaying,
    };
};

export { useCarousel };

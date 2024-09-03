const getCarouselItemProps = (index: number, currentIndex: number) => ({
    "aria-hidden": index !== currentIndex,
    tabIndex: index === currentIndex ? 0 : -1,
});

const getCarouselControlProps = (label: string) => ({
    "aria-label": label,
    tabIndex: 0,
});

const getCarouselIndicatorProps = (index: number, currentIndex: number) => ({
    "aria-label": `Go to slide ${index + 1}`,
    "aria-current": index === currentIndex,
    tabIndex: 0,
});

export { getCarouselItemProps, getCarouselControlProps, getCarouselIndicatorProps };

const getCarouselProps = (label: string) => ({
    role: "region",
    "aria-roledescription": "carousel",
    "aria-label": label,
});

const getCarouselContentProps = (
    isAutoPlayEnabled: boolean
): {
    "aria-live": "off" | "polite";
} => ({
    "aria-live": isAutoPlayEnabled ? "off" : "polite",
});

const getCarouselItemProps = (index: number, currentIndex: number, totalSlides: number) => ({
    "aria-hidden": index !== currentIndex,
    tabIndex: index === currentIndex ? 0 : -1,
    role: "group",
    "aria-roledescription": "slide",
    "aria-label": `Slide ${index + 1} of ${totalSlides}`,
});

const getCarouselControlProps = (label: string, controlsId: string) => ({
    "aria-label": label,
    tabIndex: 0,
    role: "button",
    "aria-controls": controlsId,
});

const getCarouselIndicatorProps = (index: number, currentIndex: number) => ({
    "aria-label": `Go to slide ${index + 1}`,
    "aria-current": index === currentIndex,
    tabIndex: 0,
    role: "button",
    "aria-controls": `carousel-item-${index + 1}`,
});

export {
    getCarouselProps,
    getCarouselContentProps,
    getCarouselItemProps,
    getCarouselControlProps,
    getCarouselIndicatorProps,
};

import { useRef, useEffect, RefObject } from "react";

function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T>,
    handler: (event: MouseEvent | TouchEvent) => void,
    isListening: boolean = true
) {
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        if (!isListening) return;

        const element = ref.current;
        if (!element) return;

        const listener = (event: MouseEvent | TouchEvent) => {
            if (!element.contains(event.target as Node)) {
                savedHandler.current(event);
            }
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, isListening]);
}

export default useClickOutside;

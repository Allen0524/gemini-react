import { renderHook, fireEvent } from "@testing-library/react";
import useClickOutside from "./useClickOutside";

describe("useClickOutside", () => {
    let container: HTMLDivElement;
    let handler: jest.Mock;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        handler = jest.fn();
    });

    afterEach(() => {
        document.body.removeChild(container);
        jest.clearAllMocks();
    });

    it("should call handler when clicking outside", () => {
        const ref = { current: container };
        renderHook(() => useClickOutside(ref, handler, true));

        fireEvent.mouseDown(document.body);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should not call handler when clicking inside", () => {
        const ref = { current: container };
        renderHook(() => useClickOutside(ref, handler, true));

        fireEvent.mouseDown(container);
        expect(handler).not.toHaveBeenCalled();
    });

    it("should not call handler when isListening is false", () => {
        const ref = { current: container };
        renderHook(() => useClickOutside(ref, handler, false));

        fireEvent.mouseDown(document.body);
        expect(handler).not.toHaveBeenCalled();
    });

    it("should work with touch events", () => {
        const ref = { current: container };
        renderHook(() => useClickOutside(ref, handler, true));

        fireEvent.touchStart(document.body);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should remove event listeners on unmount", () => {
        const ref = { current: container };
        const { unmount } = renderHook(() => useClickOutside(ref, handler, true));

        const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");
        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
        expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
        expect(removeEventListenerSpy).toHaveBeenCalledWith("touchstart", expect.any(Function));
    });
});

import * as React from "react";
import { dropdownStyles } from "./style.css";
import { DropdownContext, useDropdownContext } from "./context";

interface DropdownProps {
    children: React.ReactNode;
}

const Dropdown = ({ children }: DropdownProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const handleClose = React.useCallback(() => setIsOpen(false), []);
    useClickOutside(dropdownRef, handleClose, isOpen);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen, selectedValue, setSelectedValue }}>
            <div ref={dropdownRef} className={dropdownStyles.container}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

interface TriggerProps {
    children: React.ReactNode;
}

const Trigger = ({ children }: TriggerProps) => {
    const { isOpen, setIsOpen, selectedValue } = useDropdownContext();

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
            event.preventDefault();
            setIsOpen(true);
        }
    };

    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            className={dropdownStyles.trigger}
        >
            {selectedValue || children}
        </button>
    );
};

interface ListProps {
    children: React.ReactNode;
}

const List = ({ children }: ListProps) => {
    const { isOpen, selectedValue, setIsOpen, setSelectedValue } = useDropdownContext();
    const [focusedIndex, setFocusedIndex] = React.useState(-1);

    const options = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === Option
    ) as React.ReactElement<OptionProps>[];

    const selectedIndex = options.findIndex((option) => option.props.value === selectedValue);

    const getFirstEnabledOptionIndex = () => {
        return options.findIndex((option) => !option.props.disabled);
    };

    React.useEffect(() => {
        if (isOpen) {
            let indexToFocus;
            if (selectedIndex >= 0) {
                indexToFocus = selectedIndex;
            } else {
                indexToFocus = getFirstEnabledOptionIndex();
            }
            setFocusedIndex(indexToFocus);
        }
    }, [isOpen, selectedIndex]);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const moveIndex = (step: number) => {
            let newIndex = focusedIndex;
            do {
                newIndex = (newIndex + step + options.length) % options.length;
            } while (options[newIndex].props.disabled && newIndex !== focusedIndex);
            setFocusedIndex(newIndex);
        };

        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                moveIndex(1);
                break;
            case "ArrowUp":
                event.preventDefault();
                moveIndex(-1);
                break;
            case "Enter":
            case " ":
                event.preventDefault();
                if (!options[focusedIndex].props.disabled) {
                    setSelectedValue(options[focusedIndex].props.value);
                    setIsOpen(false);
                }
                break;
            case "Escape":
                event.preventDefault();
                setIsOpen(false);
                break;
        }
    };

    if (!isOpen) return null;

    return (
        <ul role="listbox" tabIndex={-1} className={dropdownStyles.list} onKeyDown={handleKeyDown}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement<OptionProps>(child) && child.type === Option) {
                    return React.cloneElement(child, { index, focusedIndex });
                }
                return child;
            })}
        </ul>
    );
};

interface OptionProps {
    children: React.ReactNode;
    value: string;
    disabled: boolean;
    index?: number;
    focusedIndex?: number;
}

const Option = ({ children, value, index, focusedIndex, disabled = false }: OptionProps) => {
    const { setSelectedValue, setIsOpen, selectedValue } = useDropdownContext();
    const optionRef = React.useRef<HTMLLIElement>(null);
    const isSelected = selectedValue === value;
    const isFocused = index === focusedIndex;

    React.useEffect(() => {
        if (isFocused && optionRef.current) {
            optionRef.current.focus();
        }
    }, [isFocused]);

    const handleSelect = () => {
        if (!disabled) {
            setSelectedValue(value);
            setIsOpen(false);
        }
    };

    return (
        <li
            ref={optionRef}
            role="option"
            tabIndex={-1}
            aria-selected={isSelected}
            aria-disabled={disabled}
            onClick={handleSelect}
            className={`${dropdownStyles.option} ${isSelected ? dropdownStyles.selectedOption : ""} ${disabled ? dropdownStyles.disabledOption : ""}`}
        >
            {children}
        </li>
    );
};

function useClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T>,
    handler: (event: MouseEvent | TouchEvent) => void,
    isListening: boolean
) {
    const savedHandler = React.useRef(handler);

    React.useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    React.useEffect(() => {
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

Dropdown.Trigger = Trigger;
Dropdown.List = List;
Dropdown.Option = Option;

export { Dropdown };

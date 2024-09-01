import { createContext, useContext } from "react";

export interface DropdownContextType {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedValue: string | null;
    setSelectedValue: React.Dispatch<React.SetStateAction<string | null>>;
}

export const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const useDropdownContext = (): DropdownContextType => {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error("useDropdownContext must be used within a DropdownProvider");
    }
    return context;
};

import * as React from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { clx_block, paddingTop, type StackElementType } from "./styles.css.ts";

type StackProps = {
    children: React.ReactNode;
    elementType?: StackElementType;
    space: string;
};

const Stack = ({ children, space, elementType = "div" }: StackProps) => {
    const Element = elementType as keyof JSX.IntrinsicElements;

    return (
        <Element>
            {React.Children.toArray(children).map((item) => {
                return (
                    <Element
                        className={`${clx_block}`}
                        style={assignInlineVars({
                            [paddingTop]: space,
                        })}
                    >
                        {item}
                    </Element>
                );
            })}
        </Element>
    );
};

export { Stack };

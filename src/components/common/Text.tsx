import { forwardRef } from "react";

import styled from "styled-components";

type Props = {
    size: "xs" | "s" | "m" | "l" | "xl" | string;
    weight: "bold" | "normal";
    variant?: "primary" | "white" | "grey" | string;
    children: React.ReactNode;
} & React.ComponentProps<"span">;

export const Text = forwardRef(({ children, ...props }: Props, ref: React.Ref<HTMLDivElement>) => {
    return (
        <TextStyle ref={ref} {...props}>
            {children}
        </TextStyle>
    );
});

const TextStyle = styled.span<Props>`
    font-weight: ${(props) => props.weight ?? "normal"};

    font-size: ${(props) => {
        switch (props.size) {
            case "xs":
                return "14px";
            case "s":
                return "16px";
            case "m":
                return "18px";
            case "l":
                return "20px";
            case "xl":
                return "22px";
            default:
                return props.size;
        }
    }};

    color: ${(props) => {
        switch (props.variant) {
            case "primary":
                return "#15104D";
            case "grey":
                return "#979797";
            case "white":
                return "#ffffff";
            default:
                return props.variant;
        }
    }};
`;

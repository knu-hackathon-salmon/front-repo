import styled from "styled-components";

export interface IText {
    size: "xs" | "s" | "m" | "l" | "xl" | string;
    weight: "bold" | "normal";
    variant?: "primary" | "white" | "grey" | string;
}

export const Text = styled.span<IText>`
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
                return "#E1F3E8";
            case "dark-primary":
                return "#1CA673";
            case "darkest":
                return "#126245";
            case "grey":
                return "#979797";
            case "white":
                return "#ffffff";
            default:
                return props.variant;
        }
    }};
`;

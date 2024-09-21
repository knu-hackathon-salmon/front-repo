import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

type Props = {
    color: string;
};
export function BackBtn({ color }: Props) {
    const navigate = useNavigate();
    return (
        <Wrapper onClick={() => navigate(-1)} color={color}>
            <IoIosArrowBack size={24} />
        </Wrapper>
    );
}

const Wrapper = styled.button<Props>`
    background: none;
    border: none;
    cursor: pointer;
    svg {
        color: ${({ color }) => (color ? color : "black")};
    }
`;

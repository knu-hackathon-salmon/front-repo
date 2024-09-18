import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

export function BackBtn() {
    const navigate = useNavigate();
    return (
        <Wrapper onClick={() => navigate(-1)}>
            <IoIosArrowBack size={24} />
        </Wrapper>
    );
}

const Wrapper = styled.button`
    background: none;
    border: none;
`;

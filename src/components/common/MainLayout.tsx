import { Outlet } from "react-router-dom";

import styled from "styled-components";

import Header, { HEADER_HEIGHT } from "./Header";
import Navigation from "./Navigation";

export default function MainLayout() {
    return (
        <>
            <Header />
            <Wrapper>
                <InnerWrapper>
                    <Outlet />
                </InnerWrapper>
            </Wrapper>
            <Navigation />
        </>
    );
}

const Wrapper = styled.main`
    width: min(100%, 700px);
    margin: 0px auto;
    padding-top: ${HEADER_HEIGHT}px;
    padding-bottom: 90px;
`;

const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

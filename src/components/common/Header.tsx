import styled from "styled-components";

export const HEADER_HEIGHT = 68;

export default function Header() {
    return <Head>푸나바다</Head>;
}
const Head = styled.header`
    width: min(100%, 700px);
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    text-align: center;
    align-content: center;

    height: ${HEADER_HEIGHT}px;

    color: #1ca673;
    background-color: white;
    font-weight: bolder;
    font-size: 18px;
    z-index: 1000;
`;

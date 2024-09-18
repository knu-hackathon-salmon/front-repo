import styled from "styled-components";

export const HEADER_HEIGHT = 68;

export default function Header() {
    return <Head>LOGO</Head>;
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

    color: rgb(85, 26, 139);
    font-weight: bold;
    z-index: 1000;
`;

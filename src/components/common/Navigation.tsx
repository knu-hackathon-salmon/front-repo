import { FaRegUser } from "react-icons/fa6";
import { PiHouseBold } from "react-icons/pi";
import { RiMapPinLine } from "react-icons/ri";
import { Link, LinkProps, useLocation } from "react-router-dom";

import styled from "styled-components";

interface NavLinkProps extends LinkProps {
    isActive: boolean;
}

export default function Navigation() {
    const location = useLocation();

    const isHomeActive = location.pathname === "/";
    const isPathActive = (basePath: string) => location.pathname.startsWith(basePath);

    return (
        <Nav>
            <NavItem>
                <NavLink to="/" isActive={isHomeActive}>
                    <PiHouseBold size={22} />
                    Home
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/map" isActive={isPathActive("/map")}>
                    <RiMapPinLine size={22} />
                    Map
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/my" isActive={isPathActive("/my")}>
                    <FaRegUser size={22} />
                    MyPage
                </NavLink>
            </NavItem>
        </Nav>
    );
}

const Nav = styled.nav`
    width: min(100%, 700px);

    display: flex;
    justify-content: space-around;
    align-items: center;

    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    padding: 16px 0px;
    z-index: 1000;
    background-color: white;
`;

const NavItem = styled.div``;

const NavLink = styled(Link)<NavLinkProps>`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    text-decoration: none;
    font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
    svg {
        background-color: ${({ isActive }) => (isActive ? "#E1E0F1" : "none")};
        padding: ${({ isActive }) => (isActive ? "4px" : "0")};
        border-radius: 50%;
    }
`;

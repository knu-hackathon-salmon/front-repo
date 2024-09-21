import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

import { styled } from "styled-components";

import Kakao from "@/assets/kakao.png";
import Image from "@/assets/logo.png";

import { authSessionStorage } from "@/utils/storage";

export default function LoginPage() {
    //test용 무적 토큰
    useEffect(() => {
        const storedToken = authSessionStorage.get();
        if (!storedToken) {
            authSessionStorage.set({
                token: "temporaryTokenValue",
                type: "Bearer",
            });
        }
    }, []);
    return (
        <Container>
            <Title>푸나바다</Title>

            <LogoContainer>
                <Logo src={Image} alt="푸나바다 로고" />
            </LogoContainer>
            <ButtonContainer>
                <Button onClick={() => (window.location.href = "http://localhost:8080/login")}>
                    <FcGoogle />
                    <span>Google 계정으로 로그인</span>
                </Button>
                <Button onClick={() => (window.location.href = "http://localhost:8080/login")}>
                    <KakaoLogo src={Kakao} alt="Kakao 로그인" />
                </Button>
            </ButtonContainer>
        </Container>
    );
}

const Container = styled.div`
    width: min(100%, 700px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 48px;
    font-weight: bolder;
    color: #1ca673;
    margin-bottom: 20px;
`;
const LogoContainer = styled.div`
    margin-bottom: 30px;
`;
const Logo = styled.img`
    width: 400px;
    height: auto;
`;
const ButtonContainer = styled.div`
    margin-top: 20px;
`;
const Button = styled.button`
    margin: 10px;
    padding: 10px 8px;
    border: none;
    border-radius: 5px;
    background: none;
    cursor: pointer;
`;
const KakaoLogo = styled.img`
    margin-right: 8px;
`;

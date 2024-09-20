import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { BackBtn } from "@/components/common/BackBtn";
import { Paragraph } from "@/components/common/Paragraph";
import { Text } from "@/components/common/Text";
import { Map } from "@/components/features/Map";

export default function DetailPage() {
    const navigate = useNavigate();
    return (
        <>
            <DetailHeader>
                <BackBtn />
                <Text size="l" weight="bold">
                    깐양파
                </Text>
            </DetailHeader>
            <Wrapper>
                <Image
                    src="https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h510"
                    alt="깐양파"
                />
                <InfoWrapper>
                    <Title>
                        <Text size="l" weight="bold">
                            기황후
                        </Text>
                        <Text size="m" weight="bold">
                            500원
                        </Text>
                    </Title>
                    <Text size="s" weight="normal" color="grey">
                        운영시간 매일 10:00 - 21:00
                        <br />
                        유통기한 냉장보관 30일
                    </Text>
                    <hr className="solid" />
                    <Text size="s" weight="normal" color="grey">
                        안녕하세요 짜장면 깐양파 너무 많이 시켜서 남아요
                        <br />
                        안녕하세요 짜장면 깐양파 너무 많이 시켜서 남아요
                        <br />
                        안녕하세요 짜장면 깐양파 너무 많이 시켜서 남아요
                        <br />
                        안녕하세요 짜장면 깐양파 너무 많이 시켜서 남아요
                        <br />
                        안녕하세요 짜장면 깐양파 너무 많이 시켜서 남아요
                        <br />
                        연락주세요
                    </Text>
                    <Paragraph size="s" weight="bold">
                        찾아가는 길
                    </Paragraph>
                    <Spacing />
                    <Map />
                </InfoWrapper>
            </Wrapper>
            <ChatBtn
                onClick={() => {
                    navigate("/chat");
                }}
            >
                채팅하기
            </ChatBtn>
        </>
    );
}

const DetailHeader = styled.div`
    width: 100%;
    padding: 12px 0px;
    span {
        display: inline-block;
        align-items: center;
    }
`;
const Wrapper = styled.div`
    z-index: 1;
`;
const Image = styled.img`
    width: 100%;
    aspect-ratio: 1.8 / 1;
`;
const InfoWrapper = styled.div`
    padding: 30px 30px 120px;
    .solid {
        margin: 20px 0px;
    }
    p {
        margin-top: 50px;
    }
`;
const Title = styled.div`
    display: flex;
    justify-content: space-between;
`;
const ChatBtn = styled.button`
    width: 180px;
    padding: 10px 0px;
    border: 1px solid #1ca673;
    border-radius: 20px;
    background-color: white;

    font-size: 14px;
    font-weight: bolder;
    color: #1ca673;
    cursor: pointer;

    position: fixed;
    bottom: 120px;

    &:hover {
        background-color: #1ca673;
        color: white;
        transition: 0.3s;
    }

    z-index: 100;
`;
const Spacing = styled.div`
    width: 100%;
    height: 10px;
`;

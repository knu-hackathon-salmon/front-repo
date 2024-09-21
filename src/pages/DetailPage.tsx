import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { BackBtn } from "@/components/common/BackBtn";
import { Paragraph } from "@/components/common/Paragraph";
import { Text } from "@/components/common/Text";

import { useDeleteFood } from "@/api/hooks/useDeleteFood";

// import { Map } from "@/components/features/Map";
type Props = {
    color: string;
};

export default function DetailPage(foodId: number) {
    const navigate = useNavigate();
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const { mutate: deleteFood } = useDeleteFood();

    const toggleOptionModal = () => {
        setIsOptionOpen(!isOptionOpen);
    };
    const handleCloseModal = () => {
        setIsOptionOpen(false);
    };
    const handlePut = (foodId: number, formData: string) => {
        navigate("/post", { state: { foodId: foodId, prevformData: formData } });
    };

    const handleDelete = (foodId: number) => {
        const isConfirm = window.confirm("삭제하시겠습니까?");
        if (!isConfirm) return;

        deleteFood(foodId, {
            onSuccess: () => {
                const isConfirm = window.confirm("삭제하시겠습니까?");
                if (!isConfirm) return;
            },
            onError: (error) => {
                console.error("Error:", error);
            },
        });
    };
    const handleTrade = () => {};
    return (
        <>
            <Wrapper>
                <ImageContainer>
                    <DetailHeader>
                        <BackBtn color="white" />
                        <OptionWrapper onClick={toggleOptionModal} color="white">
                            <HiOutlineDotsVertical size={24} />
                            {isOptionOpen && (
                                <>
                                    <ModalOverlay onClick={handleCloseModal} />
                                    <OptionModal>
                                        <OptionItem onClick={() => handlePut(foodId, "formData")}>수정</OptionItem>
                                        <OptionItem onClick={() => handleDelete(foodId)}>삭제</OptionItem>
                                        <OptionItem onClick={handleTrade}>판매완료</OptionItem>
                                    </OptionModal>
                                </>
                            )}
                        </OptionWrapper>
                    </DetailHeader>
                    <Image
                        src="https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h510"
                        alt="깐양파"
                    />
                    <TitleContainer>
                        <ShopImage
                            src="https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h510"
                            alt="shopImage"
                        />
                        <Text size="xl" weight="bold" variant="white">
                            기황후
                        </Text>
                    </TitleContainer>
                </ImageContainer>
                <InfoWrapper>
                    <HeartContainer>
                        <FaHeart />
                        <Text size="s" weight="normal" variant="grey">
                            28
                        </Text>
                    </HeartContainer>
                    <Title>
                        <Text size="l" weight="bold">
                            깐양파 팔아요
                        </Text>
                        <Text size="m" weight="bold">
                            500원
                        </Text>
                    </Title>
                    <Text size="s" weight="normal" color="grey">
                        가게주소 &nbsp; &nbsp;대구광역시 북구 경대로 101 1층
                        <br />
                        운영시간 &nbsp; &nbsp;매일 10:00 - 21:00
                        <br />
                        전화번호 &nbsp; &nbsp;053 - 1234- 5678
                        <br />
                        <br />
                        남은수량 &nbsp; &nbsp;200개
                        <br />
                        유통기한 &nbsp; &nbsp;냉장보관 30일
                    </Text>
                    <hr className="solid" />
                    <Text size="s" weight="normal" color="grey">
                        짜장 소스 만들 때 쓰는 깐양파를 0 하나 더 붙여서 주문해버렸습니다. 냉장보관 하시면 한달 안에
                        드셔야 안썩습니다. 채팅주세요
                    </Text>
                    <Spacing />
                    <Paragraph size="s" weight="bold">
                        찾아가는 길
                    </Paragraph>
                    <Spacing />
                    {/* <Map /> */}
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
const Wrapper = styled.div`
    width: 100%;
`;
const ImageContainer = styled.div`
    width: 100%;
    height: 330px;
    position: relative;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%);
        z-index: 1;
    }
`;
const DetailHeader = styled.div`
    position: absolute;
    top: 0;
    padding: 12px;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const HeartContainer = styled.div`
    align-items: center;
    justify-content: end;
    display: flex;
    gap: 4px;
    svg {
        color: #979797;
    }
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
`;
const TitleContainer = styled.div`
    position: absolute;
    bottom: 16px;
    left: 20px;
    display: flex;
    gap: 10px;
    align-items: center;

    z-index: 10;
`;
const ShopImage = styled.img`
    width: 54px;
    height: 54px;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
`;
const InfoWrapper = styled.div`
    padding: 30px 30px 120px;
    .solid {
        margin: 20px 0px;
    }
`;
const Title = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 12px 0px;
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

    z-index: 9;
`;
const Spacing = styled.div`
    width: 100%;
    height: 40px;
`;
const OptionWrapper = styled.button<Props>`
    background: none;
    border: none;
    cursor: pointer;
    svg {
        color: ${({ color }) => (color ? color : "black")};
    }
`;
const OptionModal = styled.div`
    position: absolute;
    top: 40px;
    right: 10px;
    width: 150px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 20;
`;

const OptionItem = styled.button`
    width: 100%;
    padding: 12px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
`;

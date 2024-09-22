import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";

import { BackBtn } from "@/components/common/BackBtn";
import { Paragraph } from "@/components/common/Paragraph";
import { Text } from "@/components/common/Text";

import { useDeleteFood } from "@/api/hooks/useDeleteFood";
import { useFoodDetail } from "@/api/hooks/useGetFoodDetail";

import { useAuth } from "@/provider/Auth";

// import { Map } from "@/components/features/Map";
type Props = {
    color: string;
};

export default function DetailPage() {
    const navigate = useNavigate();
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const { mutate: deleteFood } = useDeleteFood();
    const { id: foodId } = useParams();
    const { data } = useFoodDetail(Number(foodId));

    const type = useAuth()?.type;

    const foodData = data?.data;
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
                alert("삭제되었습니다.");
                navigate("/");
            },
            onError: (error) => {
                console.error("Error:", error);
            },
        });
    };

    if (!foodData) return <div>데이터가 없습니다.</div>;

    const handleTrade = () => {};
    return (
        <>
            <Wrapper>
                <ImageContainer>
                    <DetailHeader>
                        <BackBtn color="black" />
                        {type === "SHOP" ? (
                            <OptionWrapper onClick={toggleOptionModal} color="black">
                                <HiOutlineDotsVertical size={24} />
                                {isOptionOpen && (
                                    <>
                                        <ModalOverlay onClick={handleCloseModal} />
                                        <OptionModal>
                                            <OptionItem onClick={() => handlePut(Number(foodId), "formData")}>
                                                수정
                                            </OptionItem>
                                            <OptionItem onClick={() => handleDelete(Number(foodId))}>삭제</OptionItem>
                                            <OptionItem onClick={handleTrade}>판매완료</OptionItem>
                                        </OptionModal>
                                    </>
                                )}
                            </OptionWrapper>
                        ) : null}
                    </DetailHeader>
                    <Image src={foodData.foodImages[0]} alt={foodData.title} />
                    <TitleContainer>
                        <ShopImage src={foodData.shopImageUrl} alt={foodData.shopName} />
                        <Text size="xl" weight="bold" variant="white">
                            {foodData.shopName}
                        </Text>
                    </TitleContainer>
                </ImageContainer>
                <InfoWrapper>
                    <HeartContainer>
                        <FaHeart />
                        <Text size="s" weight="normal" variant="grey">
                            {foodData.likesCount}
                        </Text>
                    </HeartContainer>
                    <Title>
                        <Text size="l" weight="bold">
                            {foodData.title}
                        </Text>
                        <Text size="m" weight="bold">
                            {foodData.price}원
                        </Text>
                    </Title>
                    <Text size="s" weight="normal" color="grey">
                        가게주소 &nbsp; &nbsp;{foodData.roadAddress}
                        <br />
                        운영시간 &nbsp; &nbsp;매일 {foodData.businessHours}
                        <br />
                        전화번호 &nbsp; &nbsp;{foodData.phoneNumber}
                        <br />
                        <br />
                        남은수량 &nbsp; &nbsp;{foodData.stock}개
                        <br />
                        유통기한 &nbsp; &nbsp;{foodData.expiration}
                    </Text>
                    <hr className="solid" />
                    <Text size="s" weight="normal" color="grey">
                        {foodData.content}
                    </Text>
                    {/* <Spacing />
                    <Paragraph size="s" weight="bold">
                        찾아가는 길
                    </Paragraph>
                    <Spacing />
                    <Map /> */}
                </InfoWrapper>
            </Wrapper>
            {type === "customer" ? (
                <ChatBtn
                    onClick={() => {
                        navigate("/chat");
                    }}
                >
                    채팅하기
                </ChatBtn>
            ) : null}
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

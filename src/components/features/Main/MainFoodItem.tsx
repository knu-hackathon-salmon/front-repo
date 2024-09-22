import { useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";

import styled from "styled-components";

import { Text } from "@/components/common/Text";

import { usePostWish } from "@/api/hooks/usePostWish";

import { useAuth } from "@/provider/Auth";
import { MainItem } from "@/types";

export function MainFoodItem({ item }: { item: MainItem }) {
    const type = useAuth()?.type;
    const [isWish, setIsWish] = useState(item.wish);
    const { mutate: postWish } = usePostWish();

    const handleWish = (event: React.MouseEvent, foodId: number) => {
        event.preventDefault();
        event.stopPropagation();
        postWish(foodId, {
            onSuccess: () => {
                setIsWish((prev) => !prev);
                alert("찜 등록 완료!");
            },
            onError: (error) => {
                console.error("Error:", error);
            },
        });
    };
    return (
        <Wrapper to={`/detail/${item.foodId}`}>
            <ImageContainer>
                {type === "CUSTOMER" ? (
                    isWish ? (
                        <IoMdHeart size={24} onClick={(event) => handleWish(event, item.foodId)} />
                    ) : (
                        <IoMdHeartEmpty size={24} onClick={(event) => handleWish(event, item.foodId)} />
                    )
                ) : null}
                <Image src={item.foodImageUrl} alt={item.title} />
                <TitleContainer>
                    <ShopImage src={item.shopImageUrl} alt={item.title} />
                    <Text size="xl" weight="bold" variant="white">
                        {item.shopName}
                    </Text>
                </TitleContainer>
            </ImageContainer>
            <InfoWrapper>
                <Info>
                    <Text size="l" weight="bold">
                        {item.title}
                    </Text>
                    <Text className="address" size="xs" weight="normal" variant="gray">
                        {item.roadAddress}
                    </Text>
                    <DetailWrapper>
                        <Text size="xs" weight="normal" variant="gray">
                            {item.remainingTime}
                        </Text>
                        <Text size="xs" weight="normal" variant="gray">
                            {item.distance}km
                        </Text>
                    </DetailWrapper>
                </Info>
                <Text className="price" size="s" weight="bold">
                    {item.price}원
                </Text>
            </InfoWrapper>
        </Wrapper>
    );
}

const Wrapper = styled(Link)`
    width: 90%;
    height: auto;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border-radius: 8px;
    text-decoration: none;
    color: black;
`;
const ImageContainer = styled.div`
    width: 100%;
    height: 186px;
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
    svg {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10000;
        align-items: end;
    }
`;
const TitleContainer = styled.div`
    position: absolute;
    bottom: 10px;
    left: 20px;
    display: flex;
    gap: 10px;
    align-items: center;

    z-index: 10;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
`;
const ShopImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
`;

const InfoWrapper = styled.div`
    flex: 1;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    .address {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
    }
    .price {
        width: 30%;
        text-align: end;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 70%;
`;
const DetailWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

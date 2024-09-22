import { Link } from "react-router-dom";

import styled from "styled-components";

import { Text } from "@/components/common/Text";

import { MapItem } from "@/types";

export function FoodItem({ item }: { item: MapItem }) {
    return (
        <Wrapper to={`/detail/${item.id}`}>
            <FoodImage src={item.imageUrl} alt={item.title} />
            <InfoWrapper>
                <Info>
                    <Text size="l" weight="bold">
                        {item.title}
                    </Text>
                    <Text className="price" size="s" weight="bold">
                        {item.price}원
                    </Text>
                </Info>
                <Text size="s" weight="normal">
                    {item.storeName}
                </Text>
                <Text className="address" size="xs" weight="normal" variant="gray">
                    {item.roadAddress}
                </Text>
            </InfoWrapper>
        </Wrapper>
    );
}

const Wrapper = styled(Link)`
    width: auto;
    height: 100px;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    text-decoration: none;
    color: black;
`;

const FoodImage = styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
`;

const InfoWrapper = styled.div`
    flex: 1;
    width: 70%;
    padding-left: 20px;
    display: flex;
    flex-direction: column;

    span {
        width: fit-content;
    }
    .address {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 80%;
    }
    .price {
        text-align: end;
        padding-right: 14px;
        min-width: 30px;
    }
`;

const Info = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 5px;
`;

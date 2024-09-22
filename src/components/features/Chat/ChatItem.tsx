import { Link } from "react-router-dom";

import styled from "styled-components";

import { Text } from "@/components/common/Text";

import { ChatItemData } from "@/types";

export function ChatItem({ item }: { item: ChatItemData }) {
    return (
        <Wrapper to={`/detail/${item.chatId}`}>
            <FoodImage src={item.imageUrl} alt={item.foodTitle} />
            <InfoWrapper>
                <Text size="l" weight="bold">
                    {item.foodTitle}
                </Text>
                <Text size="s" weight="normal">
                    {item.opponentName}
                </Text>
            </InfoWrapper>
        </Wrapper>
    );
}

const Wrapper = styled(Link)`
    width: auto;
    height: 90px;
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
    width: 70%;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
`;

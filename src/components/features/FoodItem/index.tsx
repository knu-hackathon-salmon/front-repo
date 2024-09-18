import { Link } from "react-router-dom";

import styled from "styled-components";

import { Text } from "@/components/common/Text";

export type Item = {
    id: number;
    name: string;
    storeName: string;
    price: number;
    address: string;
    imageUrl: string;
};

export function FoodItem({ item }: { item: Item }) {
    return (
        <Wrapper to="/detail/1">
            <FoodImage src={item.imageUrl} alt={item.name} />
            <InfoWrapper>
                <Info>
                    <Text size="l" weight="bold">
                        {item.name}
                    </Text>
                    <Text size="s" weight="normal">
                        {item.storeName}
                    </Text>
                    <Text size="xs" weight="normal" variant="gray">
                        {item.address}
                    </Text>
                </Info>
                <Text size="s" weight="bold">
                    {item.price}원
                </Text>
            </InfoWrapper>
        </Wrapper>
    );
}

const Wrapper = styled(Link)`
    width: 230px;
    height: 100%;
    display: flex;
    overflow: hidden;
    scroll-snap-align: center;
    flex-shrink: 0;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 10px;
    text-decoration: none;
    color: black;
`;

const FoodImage = styled.img`
    width: 100%;
    max-width: 450px;
    aspect-ratio: 1.8 / 1;
`;

const InfoWrapper = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: end;
`;

const Info = styled.div`
    span {
        display: block;
    }
`;

import { Link } from "react-router-dom";

import styled from "styled-components";

import { Text } from "@/components/common/Text";

export type Item = {
    id: number;
    title: string;
    storeName: string;
    foodName: string;
    price: number;
    stock: number;
    address: string;
    imageUrl: string;
};

export function FoodItemH({ item }: { item: Item }) {
    return (
        <Wrapper to="/detail/1">
            <FoodImage src={item.imageUrl} alt={item.foodName} />
            <InfoWrapper>
                <Info>
                    <Text size="l" weight="bold">
                        {item.title}
                    </Text>
                    <Text size="m" weight="normal">
                        {item.foodName}
                    </Text>
                    <Text size="s" weight="normal">
                        {item.storeName}
                    </Text>
                    <Text size="xs" weight="normal" variant="gray">
                        {item.address}
                    </Text>
                    <Text size="xs" weight="normal" variant="gray">
                        재고: {item.stock}개
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
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    scroll-snap-align: center;
    flex-shrink: 0;
    border-radius: 10px;
    text-decoration: none;
    color: black;
    border: 1px solid #1ca673; /* 테두리 강조 */
`;

const FoodImage = styled.img`
    width: 80px; /* 이미지 크기 고정 */
    height: 80px; /* 이미지 높이 고정 */
    object-fit: cover;
    border-radius: 10px;
`;

const InfoWrapper = styled.div`
    flex: 1;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px; /* 요소 간 간격 추가 */
`;

const Price = styled.div`
    align-self: flex-end; /* 가격을 오른쪽 끝에 배치 */
`;

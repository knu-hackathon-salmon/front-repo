import { Link } from "react-router-dom";

import styled from "styled-components";

import { Text } from "@/components/common/Text";

import { MapItem } from "@/types";

export function FoodItem({ item }: { item: MapItem }) {
    return (
        <Wrapper to="/detail/1">
            <FoodImage src={item.imageUrl} alt={item.title} />
            <InfoWrapper>
                <Info>
                    <Text size="l" weight="bold">
                        {item.title}
                    </Text>
                    <Text size="s" weight="normal">
                        {item.storeName}
                    </Text>
                    <Text size="xs" weight="normal" variant="gray">
                        {item.roadAddress}
                    </Text>
                </Info>
                <Price>{item.price}원</Price>
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

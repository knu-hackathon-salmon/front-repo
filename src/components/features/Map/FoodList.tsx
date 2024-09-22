import styled from "styled-components";

import { FoodItem } from "./FoodItem";
import { MapItem, TradeItem, WishItem } from "@/types";

type FoodListProps = {
    foodItems: (MapItem | WishItem | TradeItem)[];
};

export function FoodList({ foodItems }: FoodListProps) {
    return (
        <Wrapper>
            {foodItems.map((item) => {
                return <FoodItem key={item.id} item={item} />;
            })}
        </Wrapper>
    );
}
const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    overflow: hidden;
    flex-direction: column;
    overflow-y: auto;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

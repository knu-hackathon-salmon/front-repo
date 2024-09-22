import styled from "styled-components";

import { MainFoodItem } from "./MainFoodItem";
import { MainItem } from "@/types";

export function MainFoodList({ foodItems }: { foodItems: MainItem[] }) {
    return (
        <Wrapper>
            {foodItems.map((item) => {
                return <MainFoodItem key={item.foodId} item={item} />;
            })}
        </Wrapper>
    );
}
const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    overflow: hidden;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

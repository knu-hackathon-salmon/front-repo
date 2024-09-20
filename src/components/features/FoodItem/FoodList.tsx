import { FoodItem, Item } from ".";
import styled from "styled-components";

import { FoodItemH } from "./FoodItemH";

interface Props {
    isH: boolean;
    foodItems: Item[]; // foodItems 추가
}
/*
const items: Item[] = [
    {
        id: 1,
        title: "양파 할인",
        storeName: "기황후",
        foodName: "깐양파",
        price: 500,
        stock: 10,
        address: "대구 북구",
        imageUrl: "https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h510",
    },
]; */

export function FoodList({ isH, foodItems }: Props) {
    return (
        <Wrapper isH={isH}>
            {foodItems.map((item) => {
                return isH ? <FoodItemH key={item.id} item={item} /> : <FoodItem key={item.id} item={item} />;
            })}
        </Wrapper>
    );
}
const Wrapper = styled.div<Pick<Props, "isH">>`
    display: flex;
    gap: 10px;
    overflow: hidden;
    flex-direction: ${({ isH }) => (isH ? "column" : "row")};
    overflow-x: auto;
    overflow-y: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

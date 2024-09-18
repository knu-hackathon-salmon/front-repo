import { FoodItem, Item } from ".";
import styled from "styled-components";

import { FoodItemH } from "./FoodItemH";

interface Props {
    isH: boolean;
}

const items: Item[] = [
    {
        id: 1,
        name: "깐양파",
        storeName: "기황후",
        price: 500,
        address: "대구 북구",
        imageUrl: "https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h510",
    },
    {
        id: 2,
        name: "깐양파",
        storeName: "기황후",
        price: 500,
        address: "대구 북구",
        imageUrl: "https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h510",
    },
    {
        id: 3,
        name: "깐양파",
        storeName: "기황후",
        price: 500,
        address: "대구 북구",
        imageUrl: "https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h510",
    },
    {
        id: 4,
        name: "깐양파",
        storeName: "기황후",
        price: 500,
        address: "대구 북구",
        imageUrl: "https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h510",
    },
    {
        id: 5,
        name: "깐양파",
        storeName: "기황후",
        price: 500,
        address: "대구 북구",
        imageUrl: "https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h510",
    },
    {
        id: 6,
        name: "깐양파",
        storeName: "기황후",
        price: 500,
        address: "대구 북구",
        imageUrl: "https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h510",
    },
];

export function FoodList({ isH }: { isH: boolean }) {
    return (
        <Wrapper isH={isH}>
            {items.map((item) => {
                return isH ? <FoodItemH key={item.id} item={item} /> : <FoodItem key={item.id} item={item} />;
            })}
        </Wrapper>
    );
}

const Wrapper = styled.div<Props>`
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

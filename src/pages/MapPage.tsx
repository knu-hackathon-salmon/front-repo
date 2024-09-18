import { styled } from "styled-components";

import { FoodList } from "@/components/features/FoodItem/FoodList";
import { Map } from "@/components/features/Map";

import { Select } from "@chakra-ui/react";

export default function MapPage() {
    return (
        <>
            <Map />
            <Spacing />
            <Wrapper>
                <Select>
                    <option value="option1">가까운 순</option>
                    <option value="option2">기본순</option>
                </Select>
                <FoodList isH={true} />
            </Wrapper>
        </>
    );
}
const Wrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .chakra-select__wrapper {
        width: 120px;
        margin-bottom: 10px;
    }
`;
const Spacing = styled.div`
    width: 100%;
    height: 20px;
`;

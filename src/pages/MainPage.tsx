import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

import styled from "styled-components";

import { Text } from "@/components/common/Text";
import { FoodList } from "@/components/features/FoodItem/FoodList";

export default function MainPage() {
    const [input, setInput] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <>
            <SearchBarWrapper>
                <SearchBar placeholder="키워드를 입력해주세요!" value={input} onChange={handleChange} />
                <SearchIcon />
            </SearchBarWrapper>
            <Wrapper>
                <Text size="m" weight="bold">
                    떨이 상품
                </Text>
                <FoodList isH={false} />
                <Spacing />
                <Text size="m" weight="bold">
                    최근 등록된 상품
                </Text>
                <FoodList isH={false} />
                <Spacing />
                <Text size="m" weight="bold">
                    지금 핫한 상품
                </Text>
                <FoodList isH={false} />
                <Spacing />
            </Wrapper>
        </>
    );
}
const SearchBarWrapper = styled.div`
    position: relative;
    width: 90%;
`;
const SearchBar = styled.input`
    box-sizing: border-box;

    display: block;
    margin: 15px 0px;

    border-radius: 15px;
    border: 1px solid #1ca673;
    padding: 0px 8px;

    width: 100%;
    height: 50px;

    color: #1ca673;

    &::placeholder {
        color: #78c1a7;
    }

    &:focus {
        outline: 1.5px solid #1ca673;
    }
`;

const SearchIcon = styled(IoSearchSharp)`
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    color: #1ca673;
`;

const Wrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Spacing = styled.div`
    width: 100%;
    height: 20px;
`;

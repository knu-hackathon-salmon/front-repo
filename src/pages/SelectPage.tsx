import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "styled-components";

import { Text } from "@/components/common/Text";

export default function SelectPage() {
    const [type, setType] = useState("");
    const navigate = useNavigate();

    const handleType = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (type) {
            navigate("/sign-up", {
                state: { type },
            });
        } else {
            alert("회원 종류를 선택해주세요.");
        }
    };

    return (
        <SelectWrapper>
            <Text size="xl" weight="bold">
                환영합니다!
            </Text>
            <Text size="m" weight="bold">
                회원 종류를 선택해주세요.
            </Text>
            <RadioWrapper>
                <input
                    id="buyer"
                    type="radio"
                    name="type"
                    value="buyer"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value)}
                />
                <label htmlFor="buyer">판매자예요</label>
            </RadioWrapper>
            <RadioWrapper>
                <input
                    id="seller"
                    type="radio"
                    name="type"
                    value="seller"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value)}
                />
                <label htmlFor="seller">구매자예요</label>
            </RadioWrapper>
            <NextBtn onClick={handleType}>다음</NextBtn>
        </SelectWrapper>
    );
}
const SelectWrapper = styled.div`
    width: 100%;
    text-align: center;
    span {
        display: block;
    }
`;
const NextBtn = styled.button`
    width: 80%;
    padding: 10px;
    border: none;
    background-color: #1ca673;
    color: white;
    border-radius: 100px;
    cursor: pointer;

    &:hover {
        background-color: #227e5c;
    }
`;
const RadioWrapper = styled.div`
    width: 100%;
    height: 250px;
    margin: 20px auto;

    input[type="radio"] {
        display: none;
    }
    label {
        display: block;
        border-radius: 10px;
        align-content: center;
        height: -webkit-fill-available;
        line-height: 45px;
    }
    input[type="radio"]:checked + label {
        background: #e1f3e8;
        color: #126245;
    }
    input[type="radio"] + label {
        background: #f9fafc;
        color: #126245;
    }
`;

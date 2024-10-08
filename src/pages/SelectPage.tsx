import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "styled-components";

import { Text } from "@/components/common/Text";

import Customer from "@/assets/customer.png";
import Shop from "@/assets/shop.png";

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
                    id="customer"
                    type="radio"
                    name="type"
                    value="customer"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value)}
                />
                <label htmlFor="customer">
                    <Logo src={Customer} alt="customer" />
                    구매자예요
                </label>
            </RadioWrapper>
            <RadioWrapper>
                <input
                    id="shop"
                    type="radio"
                    name="type"
                    value="shop"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value)}
                />
                <label htmlFor="shop">
                    <Logo src={Shop} alt="shop" />
                    판매자예요
                </label>
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
const Logo = styled.img`
    width: 100px;
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
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        text-align: center;
        align-items: center;
        justify-content: center;
        height: -webkit-fill-available;
        line-height: 45px;
        font-weight: bold;
        font-size: 18px;
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

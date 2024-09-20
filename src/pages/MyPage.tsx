import { useState } from "react";

import { styled } from "styled-components";

import { Text } from "@/components/common/Text";
import { FoodList } from "@/components/features/FoodItem/FoodList";

interface TabButtonProps {
    isActive: boolean;
}

export default function MyPage() {
    {
        /*유저정보를 받아서 구매자인지 판매자인지 구분하는 코드*/
    }
    const [activeTab, setActiveTab] = useState("first");
    return (
        <>
            <InfoWrapper>
                <UserInfo>
                    <UserImage>
                        <Image
                            src={
                                "https://lh3.googleusercontent.com/p/AF1QipOOZgA-Humfn9hgkj2FWq2eAWwHCB5xmOtv1ZqN=s680-w680-h51"
                            }
                        />
                    </UserImage>
                    <Text size="s" weight="bold">
                        규라일리
                    </Text>
                    <Text size="s" weight="bold">
                        @gyul
                    </Text>
                </UserInfo>
            </InfoWrapper>
            <TabMenu>
                <TabButton isActive={activeTab === "first"} onClick={() => setActiveTab("first")}>
                    구매목록
                </TabButton>
                <TabButton isActive={activeTab === "chat"} onClick={() => setActiveTab("chat")}>
                    채팅방
                </TabButton>
            </TabMenu>

            <ListWrapper>{activeTab === "first" ? <FoodList isH={true} /> : <FoodList isH={true} />}</ListWrapper>
        </>
    );
}

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    align-items: center;
    gap: 20px;
`;
const UserInfo = styled.div`
    align-items: center;
    span {
        text-align: center;
        display: block;
        margin-top: 10px;
    }
`;
const UserImage = styled.div`
    display: flex;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #126245;
    align-items: center;
    justify-content: center;
`;
const Image = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
`;

const TabMenu = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 50px 0px 20px;
    width: 90%;
`;

const TabButton = styled.button<TabButtonProps>`
    border-bottom: ${(props) => (props.isActive ? "2px solid #126245" : "1px solid #C4C4C4")};
    background: none;
    color: ${(props) => (props.isActive ? "#126245" : "#C4C4C4")};
    font-weight: bold;
    padding: 18px;
    font-size: 14px;
    cursor: pointer;
    width: 100%;
`;

const ListWrapper = styled.div`
    margin-top: 20px;
    width: 90%;
`;

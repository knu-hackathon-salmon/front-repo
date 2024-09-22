import { useState } from "react";

import { styled } from "styled-components";

import { Text } from "@/components/common/Text";
import { FoodList } from "@/components/features/Map/FoodList";

import { useGetUserInfo } from "@/api/hooks/useGeUserInfo";
import { useGetTrade } from "@/api/hooks/useGetTrade";
import { useGetWishList } from "@/api/hooks/useGetWishList";

import { useAuth } from "@/provider/Auth";
import { TradeItem, WishItem } from "@/types";

interface TabButtonProps {
    isActive: boolean;
}

export default function MyPage() {
    const type = useAuth()?.type as string;
    const userType = type ? type.toLowerCase() : "default_type";

    const [activeTab, setActiveTab] = useState(type === "SHOP" ? "first" : "wish");

    const { data: tradeListData } = type === "SHOP" ? useGetTrade() : { data: undefined };
    const { data: userData } = useGetUserInfo(userType);
    const { data: wishListData } = type === "CUSTOMER" ? useGetWishList() : { data: undefined };

    const tradeList: TradeItem[] = (tradeListData?.data || []) as TradeItem[];
    const wishList: WishItem[] = (wishListData?.data || []) as WishItem[];
    const userInfo = userData?.data;
    //chatList 추가 필요

    const renderContent = () => {
        if (activeTab === "first" && type === "SHOP") {
            return tradeList.length > 0 ? <FoodList foodItems={tradeList} /> : <NoData>판매 내역이 없습니다.</NoData>;
        } else if (activeTab === "wish" && type === "CUSTOMER") {
            return wishList.length > 0 ? <FoodList foodItems={wishList} /> : <NoData>찜 목록이 없습니다.</NoData>;
        } else if (activeTab === "chat") {
            return <NoData>채팅 목록이 없습니다.</NoData>;
        }
        return null;
    };
    console.log(tradeList[0]);
    return (
        <>
            <InfoWrapper>
                <UserInfo>
                    <UserImage>
                        <Image src={userInfo?.myImageUrl} />
                    </UserImage>
                    <Text size="s" weight="bold">
                        {userInfo?.myName}
                    </Text>
                    <Text size="s" weight="bold">
                        {userInfo?.myEmail}
                    </Text>
                </UserInfo>
            </InfoWrapper>
            <TabMenu>
                {type === "SHOP" ? (
                    <TabButton isActive={activeTab === "first"} onClick={() => setActiveTab("first")}>
                        판매 목록
                    </TabButton>
                ) : (
                    <TabButton isActive={activeTab === "wish"} onClick={() => setActiveTab("wish")}>
                        찜 목록
                    </TabButton>
                )}
                <TabButton isActive={activeTab === "chat"} onClick={() => setActiveTab("chat")}>
                    채팅방
                </TabButton>
            </TabMenu>

            <ListWrapper>{renderContent()}</ListWrapper>
        </>
    );
}

const NoData = styled.div`
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    color: #888;
`;

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

import { styled } from "styled-components";

import { Text } from "@/components/common/Text";

export default function MyPage() {
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
                <div>
                    <Btn>구매 목록</Btn>
                    <Btn>채팅 목록</Btn>
                </div>
            </InfoWrapper>
            <ListWrapper>{/* <PurchaseList /> */}</ListWrapper>
        </>
    );
}

const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
const Btn = styled.button`
    border: 1px solid #126245;
    background: none;
    color: #126245;
    font-weight: bold;
    padding: 6px 16px;
    font-size: 14px;
    border-radius: 10px;
`;

const ListWrapper = styled.div``;

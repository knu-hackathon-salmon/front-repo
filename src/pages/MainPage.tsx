import { FaPencil } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { Text } from "@/components/common/Text";
import { MainFoodList } from "@/components/features/Main/MainFoodList";

import { useGetMainFood } from "@/api/hooks/useGetMainFood";

import { useAuth } from "@/provider/Auth";

export default function MainPage() {
    const { data, isLoading, error } = useGetMainFood(37.7749, -122.4194);
    const type = useAuth()?.type;

    const foodData = data?.data;
    const navigate = useNavigate();
    if (isLoading) return <p>Loading...</p>;
    if (!foodData || error) return <p>Error loading food data!</p>;

    const handleCreateFood = () => {
        navigate("/post", {
            state: { type: "create" },
        });
    };
    return (
        <>
            <Wrapper>
                <Text size="m" weight="bold">
                    지금 구매해야 하는 <span className="emph">마지막</span> 상품!
                </Text>
                {foodData && <MainFoodList foodItems={foodData.latestData} />}
                <Spacing />
                <Text size="m" weight="bold">
                    <span className="emph">방금</span> 등록된 상품!
                </Text>
                {foodData && <MainFoodList foodItems={foodData.mostLikedData} />}
                <Spacing />
                <Text size="m" weight="bold">
                    지금 <span className="emph">핫</span>한 상품!
                </Text>
                {foodData && <MainFoodList foodItems={foodData.nearestData} />}
                <Spacing />
                {type === "SHOP" ? (
                    <AddBtn onClick={() => handleCreateFood()}>
                        <FaPencil size={30} />
                    </AddBtn>
                ) : null}
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0px;
    position: relative;
    .emph {
        color: #1ca673;
        font-weight: bolders;
    }
`;

const Spacing = styled.div`
    width: 100%;
    height: 20px;
`;
const AddBtn = styled.button`
    position: fixed;
    bottom: 110px;
    right: 10vw;
    z-index: 1000;
    padding: 8px;
    border: 1px solid#1ca673;
    border-radius: 50%;
    background-color: #ecf5ef;
    svg {
        color: #1ca673;
    }
`;

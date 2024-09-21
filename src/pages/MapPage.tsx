import { useState } from "react";

import { styled } from "styled-components";

import { Map } from "@/components/features/Map";
import { FoodList } from "@/components/features/Map/FoodList";

import { BASE_URL } from "@/api/instance";

import { MapItem } from "@/types";
import { Select } from "@chakra-ui/react";

interface MapPos {
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number;
}

export default function MapPage() {
    const [bounds, setBounds] = useState<MapPos | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [foodList, setFoodList] = useState<MapItem[]>([]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "option2") {
            console.log("가까운순 버튼 클릭!");
            console.log("Bounds:", bounds);
            console.log("User Location:", userLocation);
            fetchNearbyFood();
        }
    };

    const fetchNearbyFood = () => {
        if (bounds && userLocation) {
            fetch(`${BASE_URL}/api/food/map/near/me`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    neLat: bounds.neLat,
                    neLng: bounds.neLng,
                    swLat: bounds.swLat,
                    swLng: bounds.swLng,
                    userLat: userLocation.lat,
                    userLon: userLocation.lon,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    const foodItems: MapItem[] = data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        storeName: item.storeName,
                        price: item.price,
                        stock: item.stock,
                        roadAddress: item.roadAddress,
                        imageUrl: item.imageUrl,
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }));
                    setFoodList(foodItems);
                    console.log("Food List:", foodItems);
                })
                .catch((error) => console.error("Error fetching data:", error));
        } else {
            console.error("Bounds or userLocation is not defined.");
        }
    };

    return (
        <>
            <Map setBounds={setBounds} setUserLocation={setUserLocation} />
            <Spacing />
            <Wrapper>
                <Select onChange={handleSortChange}>
                    <option value="option1">기본순</option>
                    <option value="option2">가까운 순</option>
                    <option value="option3">테스트 순</option>
                </Select>
                <FoodList foodItems={foodList} />
            </Wrapper>
        </>
    );
}

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

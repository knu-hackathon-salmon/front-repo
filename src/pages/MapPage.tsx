import { useState } from "react";

import { styled } from "styled-components";

import { Map } from "@/components/features/Map";
import { FoodList } from "@/components/features/Map/FoodList";

import { BASE_URL } from "@/api/instance";

import { authSessionStorage } from "@/utils/storage";

import { MapItem } from "@/types";
import { mapList } from "@/types/const";
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
                    Authorization: `Bearer ${authSessionStorage.get()}`,
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
                .then((response) => {
                    console.log("Response:", response);
                    return response.json();
                })
                .then((data) => {
                    console.log("API Response:", data);

                    setFoodList(data);
                    console.log("Food List:", foodList);
                })
                .catch((error) => console.error("Error fetching data:", error));
        } else {
            console.error("Bounds or userLocation is not defined.");
        }
    };

    return (
        <>
            <Map
                bounds={bounds}
                setBounds={setBounds}
                userLocation={userLocation}
                setUserLocation={setUserLocation}
                foodList={foodList}
                setFoodList={setFoodList}
            />
            <Spacing />
            <Wrapper>
                <Select onChange={handleSortChange}>
                    <option value="option1">기본순</option>
                    <option value="option2">가까운 순</option>
                </Select>
                <FoodList foodItems={mapList} />
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

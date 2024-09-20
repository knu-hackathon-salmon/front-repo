import { useState } from "react";

import { styled } from "styled-components";

import { FoodList } from "@/components/features/FoodItem/FoodList";
import { Map } from "@/components/features/Map";

import { Select } from "@chakra-ui/react";

interface MapPos {
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number;
}

interface FoodItem {
    id: number;
    title: string;
    storeName: string;
    foodName: string;
    price: number;
    stock: number;
    address: string;
    imageUrl: string;
    latitude: number; // 위도 추가
    longitude: number; // 경도 추가
}

export default function MapPage() {
    const [bounds, setBounds] = useState<MapPos | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [foodList, setFoodList] = useState<FoodItem[]>([]);

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
            fetch("/api/map/near/me", {
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
                    // 응답 데이터를 FoodItem으로 변환
                    const foodItems: FoodItem[] = data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        storeName: item.storeName,
                        foodName: item.foodName,
                        price: item.price,
                        stock: item.stock,
                        address: "", // 도로명 주소는 나중에 변환
                        imageUrl: item.imageUrl,
                        latitude: item.latitude, // 응답에서 위도 추가
                        longitude: item.longitude, // 응답에서 경도 추가
                    }));

                    // 도로명 주소 변환
                    const geocoder = new kakao.maps.services.Geocoder();
                    foodItems.forEach((item) => {
                        const { latitude, longitude } = item; // 응답에서 위도와 경도 가져오기
                        geocoder.coord2Address(longitude, latitude, (address: { address: any }[]) => {
                            const getAddressName = address[0]?.address || "주소 없음";
                            item.address = getAddressName; // 변환된 주소 저장
                        });
                    });

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
                <FoodList isH={true} foodItems={foodList} />
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

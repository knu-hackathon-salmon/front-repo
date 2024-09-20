import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

//index tsx 자식 - MapPage.tsx 부모

declare global {
    interface Window {
        kakao: any;
    }
}

interface MapPos {
    neLat: number;
    neLng: number;
    swLat: number;
    swLng: number;
}

interface MapProps {
    setBounds: React.Dispatch<React.SetStateAction<MapPos | null>>;
    setUserLocation: React.Dispatch<React.SetStateAction<{ lat: number; lon: number } | null>>;
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
}

const positions = [
    {
        title: "카카오",
        address: "제주특별자치도 제주시 첨단로 242",
    },
    {
        title: "생태연못",
        address: "경기 남양주시 조안면 능내리 50",
    },
    {
        title: "근린공원",
        address: "경기 남양주시 별내면 청학로68번길 40",
    },
];

export function Map({ setBounds, setUserLocation }: MapProps) {
    const { kakao } = window;
    const mapRef = useRef<HTMLDivElement>(null);
    //const [bounds, setBounds] = useState<MapPos | null>(null);
    //const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [userLocation, setUserLocationState] = useState<{ lat: number; lon: number } | null>(null);

    const [foodList, setFoodList] = useState<FoodItem[]>([]);

    // 지도 객체 및 마커 표시 함수
    function initMap() {
        const container = mapRef.current;
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 5,
        };

        const map = new kakao.maps.Map(container as HTMLDivElement, options);

        // 마커 표시 함수
        function displayMarker(position: kakao.maps.LatLng) {
            new kakao.maps.Marker({
                map,
                position,
            });
        }

        // 기본 위치 설정 함수
        function setDefaultPosition() {
            const defaultPosition = new kakao.maps.LatLng(35.890667227835074, 128.61211875226806);
            displayMarker(defaultPosition);
            map.setCenter(defaultPosition);
        }

        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    // 유저의 위치를 콘솔에 출력
                    console.log("User Location:", { lat, lon });

                    const locPosition = new kakao.maps.LatLng(lat, lon);

                    // 마커와 인포윈도우를 표시합니다
                    displayMarker(locPosition);
                    map.setCenter(locPosition);

                    // 사용자 위치 저장
                    setUserLocation({ lat, lon });
                    const bounds = map.getBounds();
                    // 지도 경계 업데이트 후
                    const ne = bounds.getNorthEast();
                    const sw = bounds.getSouthWest();
                    const newMapPos: MapPos = {
                        neLat: ne.getLat(),
                        neLng: ne.getLng(),
                        swLat: sw.getLat(),
                        swLng: sw.getLng(),
                    };
                    setBounds(newMapPos);

                    // 사용자 도로명 주소 변환
                    const geocoder = new kakao.maps.services.Geocoder();
                    geocoder.coord2Address(lon, lat, (address: { address: any }[]) => {
                        const getAddressName = address[0].address;
                        console.log("getAddressName : ", getAddressName);
                    });
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    setDefaultPosition();
                },
            );
        } else {
            // GeoLocation을 사용할 수 없을때 기본 위치 설정
            setDefaultPosition();
        }

        // 지도 크기나 위치가 변경될 때마다 호출
        function updateBounds() {
            const bounds = map.getBounds();

            if (bounds) {
                const ne = bounds.getNorthEast();
                const sw = bounds.getSouthWest();
                const newMapPos: MapPos = {
                    neLat: ne.getLat(),
                    neLng: ne.getLng(),
                    swLat: sw.getLat(),
                    swLng: sw.getLng(),
                };
                console.log("MapPos:", newMapPos);

                setBounds(newMapPos);

                // 사용자 위치와 지도 경계를 포함하여 API 요청
                if (userLocation) {
                    fetch("http://localhost:8080/api/map", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            neLat: newMapPos.neLat,
                            neLng: newMapPos.neLng,
                            swLat: newMapPos.swLat,
                            swLng: newMapPos.swLng,
                            //userLat: userLocation.lat,
                            //userLon: userLocation.lon,
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            // foodList 업데이트
                            setFoodList(data);
                            console.log("Food List:", data);
                        })
                        .catch((error) => console.error("Error fetching data:", error));
                }
            }
        }

        kakao.maps.event.addListener(map, "idle", updateBounds);

        const geocoder = new kakao.maps.services.Geocoder();
        positions.forEach((position) => {
            geocoder.addressSearch(position.address, (result: any[], status: any) => {
                if (status === kakao.maps.services.Status.OK && result[0]) {
                    const coords = new kakao.maps.LatLng(parseFloat(result[0].y), parseFloat(result[0].x));
                    displayMarker(coords);
                }
            });
        });
    }

    useEffect(() => {
        initMap();
    }, []);

    // foodList 상태가 변경될 때마다 foodList를 콘솔에 출력
    useEffect(() => {
        if (foodList.length > 0) {
            console.log("Updated Food List:", foodList);
            foodList.forEach((item) => {
                console.log(
                    `ID: ${item.id}, Title: ${item.title}, Store: ${item.storeName}, Food: ${item.foodName}, Price: ${item.price}, Address: ${item.address}`,
                );
            });
        }
    }, [foodList]);
    return <Div ref={mapRef} />;
}

const Div = styled.div`
    width: 100%;
    height: 400px;
`;

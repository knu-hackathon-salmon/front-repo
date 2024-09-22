import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import { BASE_URL } from "@/api/instance";

import { authSessionStorage } from "@/utils/storage";

import { MapItem } from "@/types";

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
    bounds: MapPos | null;
    setBounds: React.Dispatch<React.SetStateAction<MapPos | null>>;
    userLocation: { lat: number; lon: number } | null;
    setUserLocation: React.Dispatch<React.SetStateAction<{ lat: number; lon: number } | null>>;
    foodList: MapItem[];
    setFoodList: React.Dispatch<React.SetStateAction<MapItem[]>>;
}

export function Map({ bounds, setBounds, userLocation, setUserLocation, foodList, setFoodList }: MapProps) {
    const { kakao } = window;
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<kakao.maps.Map | null>(null);

    // 지도 초기화
    useEffect(() => {
        const container = mapRef.current;
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 5,
        };
        const newMap = new kakao.maps.Map(container as HTMLDivElement, options);
        setMap(newMap);
        initMap(newMap);
    }, []);

    function initMap(map: kakao.maps.Map) {
        const displayMarker = (position: kakao.maps.LatLng) => {
            new kakao.maps.Marker({
                map,
                position,
            });
        };

        const setDefaultPosition = () => {
            const defaultPosition = new kakao.maps.LatLng(35.890667227835074, 128.61211875226806);
            displayMarker(defaultPosition);
            map.setCenter(defaultPosition);
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    console.log("User Location:", { lat, lon });
                    setUserLocation({ lat, lon });
                    const locPosition = new kakao.maps.LatLng(lat, lon);
                    displayMarker(locPosition);
                    map.setCenter(locPosition);
                    updateBounds(map);
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    setDefaultPosition();
                },
            );
        } else {
            setDefaultPosition();
        }

        kakao.maps.event.addListener(map, "idle", () => updateBounds(map));
    }

    const updateBounds = (map: kakao.maps.Map) => {
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

            if (userLocation) {
                fetch(`${BASE_URL}/api/food/map/near/box`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authSessionStorage.get()}`,
                    },
                    body: JSON.stringify({
                        neLat: newMapPos.neLat,
                        neLng: newMapPos.neLng,
                        swLat: newMapPos.swLat,
                        swLng: newMapPos.swLng,
                        userLat: userLocation.lat,
                        userLon: userLocation.lon,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("API Response:", data);
                        setFoodList(data);
                    })
                    .catch((error) => console.error("Error fetching data:", error));
            }
        }
    };

    useEffect(() => {
        foodList.forEach((position) => {
            const coords = new kakao.maps.LatLng(Number(position.latitude), Number(position.longitude));
            const marker = new kakao.maps.Marker({
                map: map,
                position: coords,
            });
        });
    }, [foodList, map]);

    return <Div ref={mapRef} />;
}

const Div = styled.div`
    width: 100%;
    height: 400px;
`;

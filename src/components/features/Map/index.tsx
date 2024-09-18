import { useEffect, useRef } from "react";

import styled from "styled-components";

declare global {
    interface Window {
        kakao: any;
    }
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

export function Map() {
    const { kakao } = window;
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mapRef.current;
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 5,
        };
        // 지도 객체 생성
        const map = new kakao.maps.Map(container as HTMLDivElement, options);

        // 마커 표시
        function displayMarker<T extends { location_y: number; location_x: number }>(data: T) {
            const Position = new window.kakao.maps.LatLng(data.location_y, data.location_x);
            const marker = new kakao.maps.Marker({
                map,
                position: Position,
            });

            marker.setMap(map);
        }

        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const locPosition = new kakao.maps.LatLng(lat, lon);

                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition);
                map.setCenter(locPosition);
            });
        } else {
            // GeoLocation을 사용할 수 없을때 경북대로
            const locPosition = new kakao.maps.LatLng(35.890667227835074, 128.61211875226806);

            displayMarker(locPosition);
            map.setCenter(locPosition);
        }

        const geocoder = new kakao.maps.services.Geocoder();
        positions.forEach(function (position) {
            // 주소로 좌표 검색
            geocoder.addressSearch(position.address, function (result: any, status: any) {
                if (status === kakao.maps.services.Status.OK) {
                    const coords = new kakao.maps.LatLng(parseFloat(result[0].y), parseFloat(result[0].x));

                    displayMarker(coords);
                }
            });
        });
    }, []);

    return <Div ref={mapRef} />;
}

const Div = styled.div`
    width: 100%;
    height: 400px;
`;

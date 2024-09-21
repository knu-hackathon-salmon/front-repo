import { fetchInstance } from "../instance";
import { useQuery } from "@tanstack/react-query";

export const getCoordinates = async (address: string) => {
    const response = await fetchInstance.get(`https://dapi.kakao.com/v2/local/search/address.json`, {
        params: { query: address },
        headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_GO_KEY}`,
        },
    });

    const { documents } = response.data;

    if (documents.length > 0) {
        const { x, y } = documents[0];
        return { latitude: y, longitude: x };
    }
};

export const useGetCoordinates = (address: string) =>
    useQuery({
        queryKey: ["coordinates", address],
        queryFn: () => getCoordinates(address),
        enabled: !!address,
    });

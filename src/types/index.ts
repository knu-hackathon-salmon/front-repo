export type ShopSignUpRequest = {
    shopSignUpRequest: {
        shopName: string;
        roadAddress: string;
        detailAddress: string;
        latitude: number | undefined;
        longitude: number | undefined;
        businessHours: string;
        phoneNumber: string;
        shopDescription: string;
    };
};

export type CustomerSignUpRequest = {
    customerSignUpRequest: {
        nickname: string;
        phoneNumber: string;
        roadAddress: string;
        detailAddress: string;
        latitude: number | undefined;
        longitude: number | undefined;
    };
};
export type UploadImage = {
    file: File;
    thumbnail: string;
    type: string;
};
export interface postCode {
    roadAddress: string;
    zonecode: number | string;
}
export type MapItem = {
    id: number;
    title: string;
    storeName: string;
    price: number;
    stock: number;
    roadAddress: string;
    latitude: number;
    longitude: number;
    imageUrl: string;
};

export interface MainItem {
    foodId: number;
    shopImageUrl: string;
    shopName: string;
    foodImageUrl: string;
    title: string;
    likesCount: number;
    roadAddress: string;
    remainingTime: string;
    distance: number;
    price: number;
    wish?: boolean;
}

export interface FoodMainOverviewResponse {
    data: {
        additionalProp1: MainItem[];
        additionalProp2: MainItem[];
        additionalProp3: MainItem[];
    };
}

export interface PostFoodDetailResponse {
    data: {
        foodId: number;
        shopImageUrl: string;
        shopName: string;
        title: string;
        price: number;
        likesCount: number;
        roadAddress: string;
        businessHours: string;
        phoneNumber: string;
        stock: number;
        expiration: string;
        content: string;
        foodImages: string[];
        trading: boolean;
    };
}
export interface WishItem {
    id: number;
    title: string;
    storeName: string;
    price: number;
    stock: number;
    roadAddress: string;
    latitude: number;
    longitude: number;
    imageUrl: string;
    wish: true;
}
export interface GetWishListResponse {
    data: WishItem;
}

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

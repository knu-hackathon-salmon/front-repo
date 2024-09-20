import { useRef, useState, useMemo } from "react";
import { FaCamera } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import { styled } from "styled-components";

import { Text } from "@/components/common/Text";
import DaumPost from "@/components/features/SignUp/DaumPost";

import { fetchInstance } from "@/api/instance";

import { Coordinates } from "@/types";

type UploadImage = {
    file: File;
    thumbnail: string;
    type: string;
};
interface postCode {
    roadAddress: string;
    zonecode: number | string;
}

export default function SignUpPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<UploadImage | null>(null);
    const [userName, setUserName] = useState("");
    const [userTel, setUserTel] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [businessHours, setBusinessHours] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null); // 위도, 경도 상태 추가
    const [popup, setPopup] = useState(false);
    const [form, setForm] = useState<postCode>({
        roadAddress: "",
        zonecode: "",
    });
    const handleComplete = () => {
        setPopup(!popup);
    };

    const navigate = useNavigate();
    const location = useLocation();
    const { type } = location.state || {};

    const handleClickFileInput = () => {
        fileInputRef.current?.click();
    };

    const uploadProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList[0]) {
            const url = URL.createObjectURL(fileList[0]);
            setImageFile({
                file: fileList[0],
                thumbnail: url,
                type: fileList[0].type.slice(0, 5),
            });
        }
    };

    const fetchCoordinates = async (address: string) => {
        try {
            const response = await fetchInstance.get(`https://dapi.kakao.com/v2/local/search/address.json`, {
                params: { query: address },
                headers: {
                    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_MAP_KEY}`,
                },
            });

            const { documents } = response.data;
            if (documents.length > 0) {
                const { x, y } = documents[0];
                setCoordinates({ latitude: y, longitude: x });
            }
        } catch (error) {
            console.error("Failed to fetch coordinates:", error);
        }
    };

    const showImage = useMemo(() => {
        if (!imageFile) {
            return <FaCamera />;
        }
        return <ShowFileImage src={imageFile.thumbnail} alt={imageFile.type} onClick={handleClickFileInput} />;
    }, [imageFile]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetchCoordinates(form.roadAddress);

        const jsonData =
            type === "shop"
                ? {
                      shopSignUpRequest: {
                          shopName: userName, // 업체명
                          roadAddress: form.roadAddress, // 기본주소
                          detailAddress: detailAddress, // 상세주소
                          latitude: coordinates?.latitude, // 위도
                          longitude: coordinates?.longitude, // 경도
                          businessHours: businessHours, // 운영시간
                          phoneNumber: userTel, // 전화번호
                          shopDescription: productDescription, // 상품 소개
                      },
                  }
                : {
                      customerSignUpRequest: {
                          nickname: userName, // 닉네임
                          phoneNumber: userTel, // 전화번호
                          roadAddress: form.roadAddress, // 기본주소
                          detailAddress: detailAddress, // 상세주소
                          latitude: coordinates?.latitude, // 위도
                          longitude: coordinates?.longitude, // 경도
                      },
                  };

        const formData = new FormData();
        const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: "application/json" });
        formData.append("jsonData", jsonBlob);

        if (imageFile) {
            formData.append("uploadPhoto", imageFile.file);
        }
        try {
            const response = await fetchInstance.post(`/api/member/${type}/sign-up`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            navigate("/");
        } catch (error) {
            console.error("Error submitting the form:", error);
        }
    };

    return (
        <PostContainer>
            <Text size="s" weight="bold">
                회원 정보
            </Text>
            <ImageWrapper>{showImage}</ImageWrapper>
            <Form onSubmit={handleSubmit}>
                <FileInput
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    ref={fileInputRef}
                    onChange={uploadProfile}
                    multiple
                />
                <UploadButton type="button" onClick={handleClickFileInput}>
                    사진 편집
                </UploadButton>
                <InputWrapper>
                    <Text size="s" weight="bold">
                        {type === "shop" ? "업체명" : "닉네임"}
                    </Text>
                    <InputField
                        type="text"
                        placeholder="이름"
                        value={userName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <Text size="s" weight="bold">
                        주소
                    </Text>
                    <AddressWrapper>
                        <ZipWrapper>
                            <InputField
                                className="color address"
                                value={form.zonecode}
                                type="text"
                                placeholder="우편번호"
                            />
                            <Button onClick={handleComplete}>주소 검색</Button>
                        </ZipWrapper>
                        <InputField
                            className="color address"
                            value={form.roadAddress}
                            type="text"
                            placeholder="기본주소"
                        />
                        <InputField
                            className="address"
                            type="text"
                            placeholder="상세주소"
                            value={detailAddress}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetailAddress(e.target.value)}
                        />
                        {popup && <DaumPost address={form} setAddress={setForm} handleComplete={handleComplete} />}
                    </AddressWrapper>
                </InputWrapper>
                <InputWrapper>
                    <Text size="s" weight="bold">
                        전화번호
                    </Text>
                    <InputField
                        type="tel"
                        placeholder="ex) 053-123-4567"
                        value={userTel}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserTel(e.target.value)}
                        required
                    />
                </InputWrapper>
                {type === "shop" ? (
                    <>
                        <InputWrapper>
                            <Text size="s" weight="bold">
                                운영시간
                            </Text>
                            <InputField
                                className="businessHours"
                                type="text"
                                placeholder="ex) 10:00 - 22:00"
                                value={businessHours}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusinessHours(e.target.value)}
                                required
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <Text size="s" weight="bold">
                                소개
                            </Text>
                            <InputField
                                className="description"
                                type="text"
                                placeholder="상품 소개"
                                value={productDescription}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setProductDescription(e.target.value)
                                }
                                required
                            />
                        </InputWrapper>
                    </>
                ) : null}
                <SubmitButton type="submit">시작 하기</SubmitButton>
            </Form>
        </PostContainer>
    );
}

const PostContainer = styled.div`
    width: 80%;
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    align-items: center;
`;
const FileInput = styled.input`
    display: none;
`;

const ImageWrapper = styled.div`
    display: flex;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #126245;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    svg {
        width: 100px;
    }
`;
const ShowFileImage = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
`;

const UploadButton = styled.button`
    margin: 10px;
    padding: 8px;
    border: 1px solid black;
    background: none;
    color: black;
    border-radius: 5px;
    cursor: pointer;
`;
const SubmitButton = styled.button`
    width: 80%;
    padding: 10px;
    border: none;
    background-color: #1ca673;
    color: white;
    border-radius: 100px;
    cursor: pointer;

    &:hover {
        background-color: #227e5c;
    }
`;
const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: start;
    justify-content: space-between;
    span {
        margin-top: 10px;
    }
    .description {
        padding-top: 50px;
        padding-bottom: 50px;
    }
`;

const InputField = styled.input`
    width: 80%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    @media screen and (min-width: 400px) {
        width: 75%;
    }
`;

const AddressWrapper = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .color {
        background-color: var(--highlight-lightest, #eaf2ff);
    }
    .address {
        width: 100%;
    }
    @media screen and (min-width: 400px) {
        width: 75%;
    }
`;
const ZipWrapper = styled.div`
    display: flex;
    gap: 10px;
    width: 65%;
    @media screen and (max-width: 470px) {
        width: 100%;
    }
`;

const Button = styled.button`
    width: 200px;
    padding: 10px;
    border: none;
    background-color: #1ca673;
    color: white;
    border-radius: 100px;
    cursor: pointer;

    &:hover {
        background-color: #227e5c;
    }
`;

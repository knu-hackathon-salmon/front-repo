import { useRef, useState, useMemo } from "react";
import { FaCamera } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import { styled } from "styled-components";

import { Text } from "@/components/common/Text";
import DaumPost from "@/components/features/SignUp/DaumPost";

import { useGetCoordinates } from "@/api/hooks/useGetCoordinates";
import { usePostSignup } from "@/api/hooks/usePostSignup";

import { UploadImage, postCode } from "@/types";

export default function SignUpPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<UploadImage | null>(null);
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [businessHours, setBusinessHours] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [popup, setPopup] = useState(false);
    const [form, setForm] = useState<postCode>({
        roadAddress: "",
        zonecode: "",
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { type } = location.state || {};

    const { mutate: postSignup } = usePostSignup();

    const handleComplete = () => {
        setPopup(!popup);
    };

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
    const showImage = useMemo(() => {
        if (!imageFile) {
            return <FaCamera />;
        }
        return <ShowFileImage src={imageFile.thumbnail} alt={imageFile.type} onClick={handleClickFileInput} />;
    }, [imageFile]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { latitude, longitude } = (await useGetCoordinates(form.roadAddress).data) || {};
        const jsonData =
            type === "shop"
                ? {
                      shopSignUpRequest: {
                          shopName: userName,
                          roadAddress: form.roadAddress,
                          detailAddress,
                          latitude,
                          longitude,
                          businessHours,
                          phoneNumber,
                          shopDescription: productDescription,
                      },
                  }
                : {
                      customerSignUpRequest: {
                          nickname: userName,
                          phoneNumber,
                          roadAddress: form.roadAddress,
                          detailAddress,
                          latitude,
                          longitude,
                      },
                  };

        const formData = new FormData();
        formData.append("jsonData", new Blob([JSON.stringify(jsonData)], { type: "application/json" }));
        if (imageFile) formData.append("uploadPhoto", imageFile.file);

        postSignup(
            { type, formData },
            {
                onSuccess: () => navigate("/"),
                onError: (error) => console.error("Error:", error),
            },
        );
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
                        value={phoneNumber}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
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

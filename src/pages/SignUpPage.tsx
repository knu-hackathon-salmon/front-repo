import { useRef, useState, useMemo } from "react";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { styled } from "styled-components";

import { Text } from "@/components/common/Text";

import { fetchInstance } from "@/api/instance";

type UploadImage = {
    file: File;
    thumbnail: string;
    type: string;
};

export default function SignUpPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFile, setImageFile] = useState<UploadImage | null>(null);
    const [userName, setUserName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

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
        const formData = new FormData();
        formData.append("name", userName);
        formData.append("description", productDescription);
        formData.append("address", address);
        if (imageFile) {
            formData.append("files", imageFile.file);
        }
        try {
            const response = await fetchInstance.post("/new", formData);
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
                        이름
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
                    <InputField
                        type="text"
                        placeholder="주소"
                        value={address}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <Text size="s" weight="bold">
                        소개
                    </Text>
                    <InputField
                        type="text"
                        placeholder="상품 소개"
                        value={productDescription}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductDescription(e.target.value)}
                        required
                    />
                </InputWrapper>
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
const InputField = styled.input`
    width: 70%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;

    @media screen and (min-width: 400px) {
        width: 75%;
    }
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
    align-items: center;
    justify-content: space-between;
`;

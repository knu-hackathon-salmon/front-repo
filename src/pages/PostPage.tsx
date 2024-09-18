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

export default function PostPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFiles, setImageFiles] = useState<UploadImage[]>([]);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const navigate = useNavigate();

    const handleClickFileInput = () => {
        fileInputRef.current?.click();
    };

    const uploadProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList) {
            const newImages: UploadImage[] = [];
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                const url = URL.createObjectURL(file);
                newImages.push({
                    file,
                    thumbnail: url,
                    type: file.type.slice(0, 5),
                });
            }
            setImageFiles((prevImages) => [...prevImages, ...newImages]);
        }
    };

    const showImage = useMemo(() => {
        if (imageFiles.length === 0) {
            return (
                <BlankCamera>
                    <FaCamera />
                </BlankCamera>
            );
        }
        return imageFiles.map((image, index) => (
            <ShowFileImage key={index} src={image.thumbnail} alt={image.type} onClick={handleClickFileInput} />
        ));
    }, [imageFiles]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", productName);
        formData.append("description", productDescription);
        formData.append("price", productPrice);

        imageFiles.forEach((image) => {
            formData.append("files", image.file);
        });
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
                상품 사진
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
                    사진 추가
                </UploadButton>
                <InputWrapper>
                    <Text size="s" weight="bold">
                        상품명
                    </Text>
                    <InputField
                        type="text"
                        placeholder="상품명"
                        value={productName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <Text size="s" weight="bold">
                        상품 가격
                    </Text>
                    <InputField
                        type="number"
                        placeholder="상품 가격"
                        value={productPrice}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductPrice(e.target.value)}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <Text size="s" weight="bold">
                        상품 소개
                    </Text>
                    <InputField
                        type="text"
                        placeholder="상품 소개"
                        value={productDescription}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductDescription(e.target.value)}
                        required
                    />
                </InputWrapper>
                <SubmitButton type="submit">판매 등록</SubmitButton>
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
    width: 90%;
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const ShowFileImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin: 5px;
`;

const UploadButton = styled.button`
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
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
const BlankCamera = styled.div`
    width: 200px;
    height: 200px;
    background-color: #e3e3e3;
    align-content: center;
    border-radius: 20px;

    svg {
        width: 100px;
    }
`;

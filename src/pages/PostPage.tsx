import { useRef, useState, useMemo, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

import { styled } from "styled-components";

import { BackBtn } from "@/components/common/BackBtn";
import { Text } from "@/components/common/Text";

import { usePostFood } from "@/api/hooks/usePostFood";
import { usePutFood } from "@/api/hooks/usePutFood";

type UploadImage = {
    file: File;
    thumbnail: string;
    type: string;
};

export default function PostPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageFiles, setImageFiles] = useState<UploadImage[]>([]);
    const [title, setTitle] = useState("");
    const [stock, setStock] = useState<number | null>(null);
    const [expiration, setExpiration] = useState("");
    const [price, setPrice] = useState<number | null>(null);
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { foodId, prevformData, type } = location.state || {};

    const { mutate: postFood } = usePostFood();
    const { mutate: putFood } = usePutFood();

    useEffect(() => {
        if (type === "update" && prevformData) {
            setTitle(prevformData.title);
            setStock(prevformData.stock);
            setExpiration(prevformData.expiration);
            setPrice(prevformData.price);
            setContent(prevformData.content);
            if (prevformData.images) {
                const uploadedImages: UploadImage[] = prevformData.images.map((img: string) => ({
                    file: new File([], img),
                    thumbnail: img,
                    type: "image/jpeg",
                }));
                setImageFiles(uploadedImages);
            }
        }
    }, [prevformData, type]);

    const handleClickFileInput = () => {
        fileInputRef.current?.click();
    };

    function removeImg(index: number) {
        const updatedImages = imageFiles.filter((_, i) => i !== index);
        setImageFiles(updatedImages);
    }

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
            <ShowFileWapper key={index}>
                <ShowFileImage key={index} src={image.thumbnail} alt={image.type} onClick={handleClickFileInput} />
                <ShowFileDeleteBtn type="button" onClick={() => removeImg(index)}>
                    <IoMdClose size={24} />
                </ShowFileDeleteBtn>
            </ShowFileWapper>
        ));
    }, [imageFiles]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const jsonData =
            type === "create"
                ? {
                      title,
                      stock,
                      expiration,
                      price,
                      content,
                  }
                : {
                      newTitle: title,
                      newStock: stock,
                      newExpiration: expiration,
                      newPrice: price,
                      newContent: content,
                  };
        const formData = new FormData();
        {
            type === "create"
                ? formData.append("createFoodDto", new Blob([JSON.stringify(jsonData)], { type: "application/json" }))
                : formData.append("updateFoodDto", new Blob([JSON.stringify(jsonData)], { type: "application/json" }));
        }
        imageFiles.forEach((image) => {
            formData.append("images", image.file);
        });

        if (type === "create") {
            postFood(formData, {
                onSuccess: () => navigate("/"),
                onError: (error) => console.error("Error:", error),
            });
        } else {
            putFood(
                { foodId, formData },
                {
                    onSuccess: () => navigate(`/detail/${foodId}`),
                    onError: (error: any) => {
                        console.error("Error:", error);
                        const errorMessage = error.response?.data?.message;
                        alert(errorMessage);
                    },
                },
            );
        }
    };

    return (
        <PostContainer>
            <DetailHeader>
                <BackBtn color="black" />
            </DetailHeader>
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
                        제목
                    </Text>
                    <InputField
                        type="text"
                        placeholder="제목"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <Text size="s" weight="bold">
                        판매 가격
                    </Text>
                    <InputField
                        type="number"
                        placeholder="판매 가격"
                        value={price !== null ? price : ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPrice(e.target.value ? Number(e.target.value) : null)
                        }
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <Text size="s" weight="bold">
                        재고 수량
                    </Text>
                    <InputField
                        type="number"
                        placeholder="재고 수량"
                        value={stock !== null ? stock : ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setStock(e.target.value ? Number(e.target.value) : null)
                        }
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <Text size="s" weight="bold">
                        유통기한
                    </Text>
                    <InputField
                        type="text"
                        placeholder="ex) 냉장보관 30일"
                        value={expiration}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpiration(e.target.value)}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                    <Text size="s" weight="bold">
                        상품 소개
                    </Text>
                    <InputField
                        className="description"
                        type="text"
                        placeholder="상품을 소개해주세요"
                        value={content}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
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
const DetailHeader = styled.div`
    z-index: 10;
    width: 100%;
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
const ShowFileWapper = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    scroll-snap-align: start;
    flex-shrink: 0;
    margin: 8px;
`;
const ShowFileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 5px;
`;

const ShowFileDeleteBtn = styled.button`
    position: absolute;
    right: 2px;
    top: 6px;
`;
const UploadButton = styled.button`
    padding: 10px;
    border: none;
    background-color: #1ca673;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #227e5c;
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
    margin: 10px 0px;

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
    .description {
        padding-top: 50px;
        padding-bottom: 50px;
    }
`;
const BlankCamera = styled.div`
    width: 200px;
    height: 200px;
    background-color: #e3e3e3;
    align-content: center;
    border-radius: 4px;
    margin-top: 10px;

    svg {
        width: 100px;
    }
`;

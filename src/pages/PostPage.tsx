import { useRef } from "react";

import { styled } from "styled-components";

export default function PostPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <PostContainer>
            {showImage}
            <Form>
                <FileInput
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    ref={fileInputRef}
                    onChange={uploadProfile}
                />
                <FileUploadButton type="button" onClick={handleClickFileInput}>
                    사진 추가
                </FileUploadButton>
            </Form>
        </PostContainer>
    );
}

const PostContainer = styled.div``;
const Form = styled.form``;
const FileInput = styled.input``;
const FileUploadButton = styled.button``;

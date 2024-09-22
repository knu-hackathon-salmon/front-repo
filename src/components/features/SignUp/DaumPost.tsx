import DaumPostcode from "react-daum-postcode";
import { IoMdClose } from "react-icons/io";

import { styled } from "styled-components";

export default function DaumPost(props: any) {
    const complete = (data: any) => {
        let fullAddress = data.address;
        let zonecode = data.zonecode;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        props.setAddress({
            ...props,
            roadAddress: fullAddress,
            zonecode: zonecode,
        });

        props.handleComplete();
    };
    return (
        <DaumPostBackground>
            <DaumPostContainer>
                <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
                    <h1 style={{ color: "#fff", height: "50px" }}>주소 검색</h1>
                    <IoMdClose
                        onClick={() => {
                            props.handleComplete();
                        }}
                    />
                </div>
                <DaumPostcode
                    autoClose
                    style={{
                        width: "80%",
                    }}
                    onComplete={complete}
                />
            </DaumPostContainer>
        </DaumPostBackground>
    );
}
const DaumPostBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 20000;
`;

const DaumPostContainer = styled.div`
    width: 100%;
    position: absolute;
    left: 60%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
`;

import Image from "../images/logo.png";

export default function LoginPage(): JSX.Element {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>푸나바다</h1> {/* 초록색 글자 */}
            <div style={styles.logoContainer}>
                <img src={Image} alt="푸나바다 로고" style={styles.logo} />
            </div>
            <div style={styles.buttonContainer}>
                <button
                    onClick={() => (window.location.href = "http://localhost:8080/login")}
                    style={styles.loginButton}
                >
                    구글 로그인
                </button>
                <button
                    onClick={() => (window.location.href = "http://localhost:8080/login")}
                    style={styles.loginButton}
                >
                    카카오 로그인
                </button>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // 중앙 정렬
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
        height: "100vh", // 화면 전체 높이
    },
    title: {
        fontSize: "48px", // 글자 크기 키움
        fontWeight: "bold",
        color: "#1CA673", // 초록색 글자
        marginBottom: "20px", // 이미지와 간격
    },
    logoContainer: {
        marginBottom: "30px",
    },
    logo: {
        width: "400px", // 이미지 크기 키움
        height: "auto",
    },
    buttonContainer: {
        marginTop: "20px",
    },
    loginButton: {
        margin: "10px",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#1CA673", // 버튼 배경색
        color: "white",
        fontSize: "16px",
        cursor: "pointer",
    },
};

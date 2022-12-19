import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { HomePage } from "../home";
import { useAuthStore } from "../hooks";
import { Audio } from 'react-loader-spinner'
import { useEffect } from "react";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


export const AppRouter = () => {

    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])


    if (status === 'checking') {
        return (
            <div className="cargando">
                <Audio
                    height="100"
                    width="100"
                    color="#03B103"
                    ariaLabel="audio-loading"
                    wrapperStyle={{}}
                    wrapperClass="wrapper-class"
                    visible={true}
                />
            </div>
        );
    }

    return (
        <Routes>
            {
                (status === "not-authenticated")
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }

        </Routes>
    )
};

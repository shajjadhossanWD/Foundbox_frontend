import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import swal from 'sweetalert';

export const AdminContext = createContext();

export default function AdminProvider({ children }) {
    const [admin, setAdmin] = useState(null);
    const [token, setTokenss] = useState()
    const [activationToken, setActivationToken] = useState()
    const [isAuthenticating, setIsAuthenticating] = useState(false);



    // console.log(localStorage)
    useEffect(() => {
        axios.get("http://localhost:8001/api/v1/me", {
            headers: {
                'Authorization': `${localStorage.getItem('setToken')}`
            }
        })
            .then(res => {
                if (res.status === 201) {
                    setAdmin(res.data?.user);
                    console.log('userrrrrrrrrrrrrrrrrrrrrrrr : ', res.data?.user)
                }
            })
            .catch(err => {
                setAdmin(null);
            });

    }, []);



    const SignUp = async (name, email, password) => {
        await axios.post('http://localhost:8001/api/v1/registration', {
            name,
            email,
            password,
            
        })
            .then(res => {
                if (res.status === 201) {
                    setActivationToken(res.data.activationToken);
                    setIsAuthenticating(true);
                }
                swal({
                    title: "Success",
                    text: `${res.data?.message}`,
                    icon: "success",
                    button: "OK!",
                    className: "modal_class_success",
                });
            })
            .catch(error => {
                swal({
                    title: "Attention",
                    text: `${error.response?.data?.message}`,
                    icon: "warning",
                    button: "OK!",
                    className: "modal_class_success",
                });
            });

    }






    const logout = () => {
        setAdmin(null);
        localStorage.removeItem("setToken");
    }

    return (
        <AdminContext.Provider value={{
            admin,
            isAuthenticating,
            setAdmin,
            logout,
            SignUp,
            token,
            setTokenss,
            setIsAuthenticating,
            activationToken,
            setActivationToken
        }}>{children}</AdminContext.Provider>
    )
}
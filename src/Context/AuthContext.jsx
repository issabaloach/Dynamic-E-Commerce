import { Spinner } from "@nextui-org/react";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, } from 'firebase/auth'; 
import { auth } from "../utils/utils";
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [user, setUser] = useState({
        isLogin: false,
        userInfo: {}
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser({
                    isLogin: true,
                    userInfo: {
                        name: authUser.displayName,
                        photoURL: authUser.photoURL,
                        email: authUser.email,
                    },
                });
            } else {
                setUser({ isLogin: false, userInfo: {} });
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-65 flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
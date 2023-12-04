import { useContext,createContext } from "react";
import { useCookie } from "../Hooks/useCookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    let date = new Date();
    const [user,setUser] = useCookie(
        'user', // key name of cookie
        {
            token : null,
            role : null,
        },      // cookie payload
        new Date(date.getTime() + 180 * 24 * 60 * 60 * 1000), // time,
        '/',    // path of cookie
        false    // secure cookie
    );

    const Login = (user) => {
        setUser(user)
    }

    const Logout = () => {
        setUser({
            token : null,
            role : null,
        });
    }

    return <AuthContext.Provider
            value={{user,Login,Logout}}
        >
            { children }
        </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

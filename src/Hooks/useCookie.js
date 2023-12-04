import { useState } from 'react'
import Cookies from 'js-cookie';

export const useCookie = (keyName, defaultValue, expiredIn, path, secure) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = Cookies.get(keyName);
            if (value) {
                return JSON.parse(value);
            } 
            else {
                Cookies.set(keyName, JSON.stringify(defaultValue),{
                    expires : expiredIn,
                    path : path,
                    sameSite : 'Strict',
                    secure : secure
                });
                return defaultValue;
            }
        }
        catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        try {
            let date = new Date();
            Cookies.set(keyName, JSON.stringify(newValue),{
                expires : expiredIn,
                path : path,
                sameSite : 'Strict',
                secure : secure
            });
        }
        catch (err) {}
            setStoredValue(newValue);
    };
    return [storedValue, setValue];
}

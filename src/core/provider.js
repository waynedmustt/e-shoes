import React, { useEffect, useState } from "react";
import { coreService } from "./service";

export const ThemeContext = React.createContext({
    language: 'en',
    cartCount: 0,
    toggleLanguage: () => {},
    toggleCartCount: () => {}
});

const Provider = ({children}) => {
    const state = {
        language: 'en',
        cartCount: 0,
        toggleLanguage: (lang) => {
            setAppState({
                ...state,
                language: lang
            });
        },
        toggleCartCount: () => {
            const selectedCart = coreService.getObjectItem('cart');
            if (!selectedCart) {
                return;
            }
            setAppState({
                ...state,
                cartCount: selectedCart?.data?.length
            });
        }
    }
    const [appState, setAppState] = useState({});

    useEffect(() => {
        setAppState(state);
    }, [])

	return (
		<ThemeContext.Provider value={appState}>
		    {children}
		</ThemeContext.Provider>
	);
}

export default Provider;
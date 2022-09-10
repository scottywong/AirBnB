import { createContext } from "react";
import { useState } from "react";
export const NavContext = createContext();

export const NavProvider = props => {
    const[showNav,setShowNav] = useState(true);

    return (
        <NavContext.Provider value={{showNav, setShowNav}}>
        {props.children}
        </NavContext.Provider>
    );
}
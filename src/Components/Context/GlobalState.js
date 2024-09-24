import { createContext, useContext, useReducer } from "react";
import ReducerApp from "./ReducerApp";

import { initializeState } from "./ReducerApp";
const GlobalContext = createContext();
const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ReducerApp, initializeState)

    return (
        <GlobalContext.Provider value={{
            user: state.user,
            basket: state.basket,
            dispatch: dispatch,

        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider
export const useAuth = () => {
    return useContext(GlobalContext)
} 
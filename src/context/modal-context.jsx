import {  createContext,useContext,useReducer } from "react";
import { modalReducer } from "../reducer/modalReducer";

const initialValue = {
    isSignUpModalOpen:true,
    isSignInModalOpen:false,
    isSignUpSuccessfull:false
}

const ModalContext = createContext(initialValue)


const ModalProvider = ({children}) =>{

    const [{isSignInModalOpen,isSignUpModalOpen,isSignUpSuccessfull},modalDispatch] = useReducer(modalReducer,initialValue)

    return(
        <ModalContext.Provider value={{isSignInModalOpen,isSignUpModalOpen,isSignUpSuccessfull,modalDispatch}}>
            {children}
        </ModalContext.Provider>
    )
}

const useModal = ()=> useContext(ModalContext)

export {useModal,ModalProvider}
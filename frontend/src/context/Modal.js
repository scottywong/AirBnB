
import React,
{ createContext, useRef, 
  useState, useEffect, useContext} from "react";

import ReactDOM  from "react-dom";
import './Modal.css';

const ModalContext = createContext(); 

export const ModalProvider = (props) => {

    const modalRef = useRef();
    const [value, setValue] = useState('');

    useEffect(()=> {

        setValue(modalRef.current);

    },[]);

    return (
        <>
        <ModalContext.Provider value={value}>
                {props.children}
        </ModalContext.Provider>
        <div ref={modalRef}/>
        </>
    );
}


export const Modal = ({onClose,children}) => {

    const modalNode = useContext(ModalContext);

    if(!modalNode) return null;
    
    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose}/>
                <div id="modal-content">
                    {children}
                </div>
        </div>,
        modalNode
    );


}

// export default ModalProvider;
import React from 'react';
import cl from './Modal.module.scss'

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    padding?: string,
    width?: string
}

const Modal: React.FC<ModalProps> = (
    {
        open,
        onClose,
        children,
        padding,
        width
    }) => {
    if (!open) {
        return null;
    }

    return (
        <div className={cl.modalOverlay} onClick={onClose}>
            <div className={cl.modalContent} style={{padding: padding, width: width}} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;

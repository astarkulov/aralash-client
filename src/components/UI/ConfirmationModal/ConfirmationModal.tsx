import Modal from "../Modal/Modal.tsx";
import {FC} from "react";
import Button from "../Button/Button.tsx";
import cl from './ConfirmationModal.module.scss'

interface ConfirmationModalProps {
    onClose: (decision: boolean) => void,
    open: boolean
}

const ConfirmationModal:FC<ConfirmationModalProps> = (
    {
        onClose,
        open
    }) => {
    return (
        <Modal padding={'10px 20px'} onClose={() => onClose(false)} open={open}>
            <h1>Вы уверены?</h1>
            <div className={cl.buttons}>
                <Button style={{marginRight: '10px'}} onClick={() => onClose(false)}>Отмена</Button>
                <Button onClick={() => onClose(true)}>Да</Button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
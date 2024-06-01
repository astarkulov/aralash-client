import {FC, useEffect, useState} from 'react';
import Modal from "../Modal/Modal.tsx";
import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import cl from './ChangeModal.module.scss'

interface ChangeModalProps {
    onClose: (name?: string) => void,
    open: boolean,
    oldValue: string | undefined,
}

const ChangeModal: FC<ChangeModalProps> = (
    {
        open,
        onClose,
        oldValue
    }) => {
    const [value, setValue] = useState('');
    useEffect(() => {
        if(oldValue){
            setValue(oldValue);
        }
    }, [oldValue])
    return (
        <Modal padding={'10px 20px'} open={open} onClose={onClose}>
            <Input value={value} onChange={(event) => setValue(event.target.value)}/>
            <div className={cl.buttons}>
                <Button style={{marginRight: '10px'}} onClick={() => onClose()}>Отмена</Button>
                <Button onClick={() => onClose(value)}>Сохранить</Button>
            </div>
        </Modal>
    );
};

export default ChangeModal;
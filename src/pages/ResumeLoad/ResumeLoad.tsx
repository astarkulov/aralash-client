import cl from './ResumeLoad.module.scss'
import React, {useState} from "react";

const ResumeLoad = () => {
    const [labelText, setLabelText] = useState('Выбрать файлы')
    const [file, setFile] = useState<File>()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            console.log(event.target.files[0])
            setFile(event.target.files[0]);
            setLabelText(event.target.files[0].name)
        }
    }

    return (
        <div className={cl.resumeLoad}>
            <div className={cl.fileUploadWrapper}>
                <input type="file" className={cl.fileUploadInput} onChange={(event) => handleChange(event)}/>
                <p className={cl.fileUploadButton}>{labelText}</p>
            </div>
        </div>
    );
};

export default ResumeLoad;
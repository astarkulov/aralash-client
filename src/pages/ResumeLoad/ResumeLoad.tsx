import cl from './ResumeLoad.module.scss'
import React, {useRef, useState} from "react";
import FileIcon from "../../components/UI/Icons/FileIcon.tsx";
import Button from "../../components/UI/Button/Button.tsx";
import {IFileObject} from "../../models/IFileObject.ts";
import {convertFilesToArrayOfObjects} from "../../utils/convertFilesToArrayOfObjects.ts";
import PdfIcon from "../../components/UI/Icons/PdfIcon.tsx";
import {useNavigate} from "react-router-dom";

const ResumeLoad = () => {
    const [files, setFiles] = useState<IFileObject[]>()
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(convertFilesToArrayOfObjects(event.target.files));
        }
    };

    return (
        <div className={cl.resumeLoad}>
            <div className={cl.buttons}>
                <Button onClick={() => handleButtonClick()}>
                    Загрузить файлы
                </Button>
                <Button disabled={!files} onClick={() => navigate('/processing')}>
                    Обработать файлы
                </Button>
                <Button>
                    Создать шаблон
                </Button>
            </div>

            <div className={cl.files}>
                {
                    files?.map((item, index) =>
                        <div className={cl.fileItem} key={index}>
                            <FileIcon extension={item.extension}/>
                            {item.file.name}
                        </div>
                    )
                }
            </div>

            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
                onChange={handleFileChange}
                multiple
            />
        </div>
    );
};

export default ResumeLoad;


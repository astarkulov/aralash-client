import cl from './ResumeLoad.module.scss'
import React, {useRef, useState} from "react";
import FileIcon from "../../components/UI/Icons/FileIcon.tsx";
import Button from "../../components/UI/Button/Button.tsx";
import {IFileObject} from "../../models/IFileObject.ts";
import {convertFilesToArrayOfObjects} from "../../utils/convertFilesToArrayOfObjects.ts";
import {useNavigate} from "react-router-dom";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useGetAllTemplatesQuery} from "../../store/api/templateApi.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import {useStartFlowMutation} from "../../store/api/cvAnalyseApi.ts";

const ResumeLoad = () => {
    const [files, setFiles] = useState<IFileObject[]>()
    const {data: templates, isLoading: templatesLoading} = useGetAllTemplatesQuery();
    const [loadFile, {isLoading: loadFileLoading}] = useStartFlowMutation()
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const navigate = useNavigate();

    const handleClickProcessingFiles = async () => {
        const formData = new FormData()
        const filess = files?.map(x => x.file)!;
        for (const file of filess){
            formData.append('Files', file)
        }
        formData.append('RankingCriteriaTemplateId', selectedTemplate)
        formData.append('IsNeedToEvaluate', 'true')
        await loadFile(formData)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(convertFilesToArrayOfObjects(event.target.files));
        }
    };

    if(templatesLoading || loadFileLoading){
        return <Loader/>
    }

    return (
        <div className={cl.resumeLoad}>
            <div className={cl.buttons}>
                <Button onClick={() => handleButtonClick()}>
                    Загрузить файлы
                </Button>
                <Button disabled={!files} onClick={() => handleClickProcessingFiles()}>
                    Обработать файлы
                </Button>
                <FormControl sx={{minWidth: '100px'}}>
                    <InputLabel id="template-label">Шаблон</InputLabel>
                    <Select
                        labelId="template-label"
                        id="template-label"
                        value={selectedTemplate}
                        label="Шаблон"
                        onChange={(event) => setSelectedTemplate(event.target.value as string)}
                    >
                        {
                            templates?.map((item, index) => (
                                <MenuItem key={index} value={item.id}>{item.templateName}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
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

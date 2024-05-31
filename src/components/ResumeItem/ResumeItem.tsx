import {IResume} from "../../models/IResume.ts";
import {FC} from "react";
import cl from './ResumeItem.module.scss'
import ItemList from "./ItemList/ItemList.tsx";

interface ResumeItemProps {
    resume: IResume
}

const ResumeItem: FC<ResumeItemProps> = ({resume}) => {
    return (
        <div className={cl.resumeItem}>
            <h1>{resume.Name}</h1>
            <h2>Специализация: {resume.Specialization}</h2>
            <ItemList title='Компании' items={resume.Companies}/>
            <ItemList title='HardSkills' items={resume.HardSkills}/>
        </div>
    );
};

export default ResumeItem;
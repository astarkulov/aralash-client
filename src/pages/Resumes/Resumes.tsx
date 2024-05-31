import ResumeItem from "../../components/ResumeItem/ResumeItem.tsx";
import cl from './Resumes.module.scss'
import {resumes} from "../../shared/conts.ts";
import {useState} from "react";
import SearchBar from "../../components/SearchBar/SearchBar.tsx";
import {filterResumes} from "../../utils/filterResumes.ts";
import {useNavigate} from "react-router-dom";
import Button from "../../components/UI/Button/Button.tsx";

const Resumes = () => {
    const [filter, setFilter] = useState('')
    const navigate = useNavigate();
    return (
        <div className={cl.resumes}>
            <div className={cl.head}>
                <SearchBar setFilter={setFilter}/>
                <Button onClick={() => navigate('/resumeLoad')}>Загрузить резюме</Button>
            </div>
            {filterResumes(resumes, filter).map((resume, index) =>
                <ResumeItem key={index} resume={resume}/>
            )}
        </div>
    );
}

export default Resumes;
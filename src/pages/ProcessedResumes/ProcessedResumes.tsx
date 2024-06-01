import {useGetProcessedListQuery} from "../../store/api/processedResumeApi.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import cl from './ProcessedResumes.module.scss'
import { format } from 'date-fns';
import Button from "../../components/UI/Button/Button.tsx";
import {useNavigate} from "react-router-dom";

const ProcessedResumes = () => {
    const {data: processedResumes, isLoading: processedResumeLoading} = useGetProcessedListQuery();

    const navigate = useNavigate()

    const handleClickResume = (id: string) => {
        navigate('/profile/' + id);
    }

    if(processedResumeLoading){
        return <Loader/>
    }

    return (
        <div>
            {processedResumes?.map((item, index) => (
                <div key={index} className={cl.item}>
                    <h1>{item.candidateFullName}</h1>
                    <h2>Специализация: {item.specialization}</h2>
                    <p>ProcessedAt: {format(item.processedAt, 'yyyy-MM-dd HH:mm:ss')}</p>
                    <Button onClick={() => handleClickResume(item.id)}>Подробнее</Button>
                </div>
            ))}
        </div>
    );
};

export default ProcessedResumes;
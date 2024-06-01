import {
    useAddTemplateMutation,
    useGetAllTemplatesQuery
} from "../../store/api/templateApi.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import cl from './RankingTemplate.module.scss'
import Button from "../../components/UI/Button/Button.tsx";
import TemplateEdit from "../../components/TemplateEdit/TemplateEdit.tsx";
import {useState} from "react";
import {Ranking} from "../../models/Ranking.ts";

const RankingTemplate = () => {
    const {data: templates, isLoading} = useGetAllTemplatesQuery();
    const [addTemplate, {isLoading: isAddLoading}] = useAddTemplateMutation();

    const [templateEditModalOpen, setTemplateEditModalOpen] = useState(false);

    const handleCloseTemplateEditModal = async (ranking: Ranking | null) => {
        if (ranking) {
            await addTemplate(ranking)
        }
        setTemplateEditModalOpen(false)
    }

    if (isLoading || isAddLoading) {
        return <Loader/>
    }
    return (
        <div>
            <Button onClick={() => setTemplateEditModalOpen(true)}>Добавить шаблон</Button>
            {templates?.map((item, index) => (
                <div className={cl.template} key={index}>
                    <p>{item.templateName}</p>
                    <div className={cl.templateContainer}>
                        <p>Специализации:</p>
                        {
                            item.specializationRankingCriteria.map((item, index) => (
                                <div className={cl.templateItem} key={index}>
                                    <p>{item.specialization.name}</p>
                                    <p>{item.priority}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className={cl.templateContainer}>
                        <p>ХардСкилы:</p>
                        {
                            item.stackRankingCriteria.map((item, index) => (
                                <div className={cl.templateItem} key={index}>
                                    <p>{item.hardSkill.name}</p>
                                    <p>{item.priority}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))}

            <TemplateEdit open={templateEditModalOpen}
                          onClose={(ranking) => handleCloseTemplateEditModal(ranking)}/>
        </div>
    );
};

export default RankingTemplate;
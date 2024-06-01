import {useGetHardSkillsQuery, useGetSpecializationsQuery} from "../../store/api/criterionApi.ts";
import Loader from "../UI/Loader/Loader.tsx";
import React, {FC, useEffect, useState} from "react";
import {Autocomplete, Radio, TextField} from "@mui/material";
import Modal from "../UI/Modal/Modal.tsx";
import Button from "../UI/Button/Button.tsx";
import cl from './TemplateEdit.module.scss'
import PlusIcon from "../UI/Icons/PlusIcon.tsx";
import {HardSkill} from "../../models/response/HardSkill.ts";
import {Specialization} from "../../models/response/Specialization.ts";
import Input from "../UI/Input/Input.tsx";
import {Ranking} from "../../models/Ranking.ts";

interface TemplateEditProps {
    onClose: (ranking: Ranking | null) => void,
    open: boolean,
}

const TemplateEdit: FC<TemplateEditProps> = ({onClose, open}) => {
    const {data: specializationList, isLoading: specializationListLoading} = useGetSpecializationsQuery();
    const {data: hardSkillList, isLoading: hardSkillListLoading} = useGetHardSkillsQuery();

    const [templateSpec, setTemplateSpec] = useState<Specialization[]>([])
    const [templateHS, setHS] = useState<HardSkill[]>([])

    useEffect(() => {
        setTemplateSpec([])
        setHS([])
    }, [])

    const [templateName, setTemplateName] = useState('');
    const [criterionType, setCriterionType] = useState('hardSkill');
    const [criterionName, setCriterionName] = useState('');
    const [inputCriterionName, setInputCriterionName] = useState('');

    const handleChangeCriterionType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCriterionType(event.target.value);
    };

    const handleAddTemplateValue = () => {
        if (criterionType == 'hardSkill') {
            setHS([...templateHS, hardSkillList?.find(x => x.name == criterionName)!]);
        } else {
            setTemplateSpec([...templateSpec, specializationList?.find(x => x.name == criterionName)!]);
        }
    }

    const handleChangeCriterionPriority = (value: number, criterionName: string) => {
        if (criterionType == 'hardSkill') {
            setHS(prevItems => {
                const index = prevItems.findIndex(item => item.name === criterionName);
                if (index !== -1) {
                    const newItems = [...prevItems];
                    newItems[index] = {...newItems[index], priority: value};
                    return newItems;
                }
                return prevItems;
            });
        } else {
            setTemplateSpec(prevItems => {
                const index = prevItems.findIndex(item => item.name === criterionName);
                if (index !== -1) {
                    const newItems = [...prevItems];
                    newItems[index] = {...newItems[index], priority: value};
                    return newItems;
                }
                return prevItems;
            });
        }
    }

    if (specializationListLoading || hardSkillListLoading) {
        return <Loader/>
    }

    if (specializationList?.length == 0
        || hardSkillList?.length == 0
        || !specializationList
        || !hardSkillList) {
        return <Modal padding={'10px 20px'} open={open} onClose={() => onClose(null)}>Добавьте критерии</Modal>
    }

    const controlProps = (item: string) => ({
        checked: criterionType === item,
        onChange: handleChangeCriterionType,
        value: item,
        name: 'size-radio-button-demo',
        inputProps: {'aria-label': item},
    });

    return (
        <Modal open={open} onClose={() => onClose(null)} padding={'10px 20px'} width={'50%'}>
            <p>Название шаблона:</p>
            <Input type={'text'} value={templateName} onChange={(event) => setTemplateName(event.target.value)}/>
            <label>Хардскилы</label>
            <Radio {...controlProps('hardSkill')} onClick={() => setCriterionName('')}/>
            <label>Специализация</label>
            <Radio {...controlProps('specialization')} onClick={() => setCriterionName('')}/>
            <div className={cl.add}>
                <Autocomplete
                    disablePortal
                    options={criterionType == 'hardSkill'
                        ? hardSkillList?.map(x => x.name)!
                        : specializationList?.map(x => x.name)!}
                    sx={{width: 300}}
                    value={criterionName}
                    onChange={(event: any, newValue: string | null) => setCriterionName(newValue!)}
                    inputValue={inputCriterionName}
                    onInputChange={(event, newInputValue) => {
                        setInputCriterionName(newInputValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="Критерий"/>}
                />
                <button onClick={() => handleAddTemplateValue()}><PlusIcon/></button>
            </div>

            <div className={cl.templates}>
                <div>
                    <h2>Хардскилы:</h2>
                    <div>
                        {templateHS.map((item, index) => (
                            <div className={cl.templateItem} key={index}>
                                <p>{item?.name}:</p>
                                <Input
                                    type={'number'}
                                    value={item?.priority}
                                    onChange={(event) => handleChangeCriterionPriority(event.target.value, item.name)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2>Специализации:</h2>
                    {
                        templateSpec.map((item, index) => (
                            <div className={cl.templateItem} key={index}>
                                <p>{item?.name}:</p>
                                <Input
                                    type={'number'}
                                    value={item?.priority}
                                    onChange={(event) => handleChangeCriterionPriority(event.target.value, item.name)}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={cl.buttons}>
                <Button style={{marginRight: '10px'}} onClick={() => onClose(null)}>Отмена</Button>
                <Button onClick={() => onClose({
                    templateName: templateName,
                    stackRankingCriteria: templateHS.map(x => {
                        return {hardSkillId: x.id, priority: x.priority}
                    }),
                    specializationRankingCriteria: templateSpec.map(x => {
                        return {specializationId: x.id, priority: x.priority}
                    })
                })}>Сохранить</Button>
            </div>
        </Modal>
    );
};

export default TemplateEdit;
import {
    useAddHardSkillMutation,
    useChangeHardSkillMutation, useDeleteHardSkillMutation,
    useGetHardSkillsQuery
} from "../../store/api/criterionApi.ts";
import Loader from "../UI/Loader/Loader.tsx";
import cl from './HardSkillList.module.scss';
import {useEffect, useState} from "react";
import Input from "../UI/Input/Input.tsx";
import EditIcon from "../UI/Icons/EditIcon.tsx";
import DeleteIcon from "../UI/Icons/DeleteIcon.tsx";
import ChangeModal from "../UI/ChangeModal/ChangeModal.tsx";
import {HardSkill} from "../../models/response/HardSkill.ts";
import PlusIcon from "../UI/Icons/PlusIcon.tsx";
import ConfirmationModal from "../UI/ConfirmationModal/ConfirmationModal.tsx";

const HardSkillList = () => {
    const { data: hardSkills, isLoading: getIsLoading } = useGetHardSkillsQuery();
    const [addHardSkill, { isLoading: addIsLoading }] = useAddHardSkillMutation();
    const [changeHardSkill, { isLoading: changeIsLoading }] = useChangeHardSkillMutation();
    const [deleteHardSkill, {isLoading: deleteIsLoading}] = useDeleteHardSkillMutation();

    const [hardSkill, setHardSkill] = useState('');
    const [changingHardSkill, setChangingHardSkill] = useState<HardSkill>();
    const [deletingHardSkill, setDeletingHardSkill] = useState<string>('');
    const [changeModalOpen, setChangeModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const handleAddHardSkill = async () => {
        await addHardSkill({ name: hardSkill });
        setHardSkill('');
    }

    const changeHardSkillModal = async (name: string | undefined) => {
        if(name && changingHardSkill){
            await changeHardSkill({id: changingHardSkill.id, name: name})
        }
        setChangeModalOpen(false)
    }

    const handleClickChange = (hardSkill: HardSkill) => {
        setChangingHardSkill(hardSkill)
        setChangeModalOpen(true);
    }

    const handleClickDelete = (id: string) => {
        setDeletingHardSkill(id);
        setDeleteModalOpen(true);
    }

    const handleOnCloseDeleteModal = async (decision: boolean) => {
        if(decision){
            await deleteHardSkill(deletingHardSkill);
        }
        setDeleteModalOpen(false)
    }

    if (getIsLoading || addIsLoading || changeIsLoading || deleteIsLoading) {
        return <Loader />;
    }

    return (
        <div className={cl.hardSkill}>
            <div className={cl.newItem}>
                <Input
                    style={{ marginRight: '10px' }}
                    value={hardSkill}
                    onChange={(event) => setHardSkill(event.target.value)}
                    placeHolder={'Название'}
                />
                <button onClick={() => handleAddHardSkill()}><PlusIcon/></button>
            </div>
            <table className={cl.table}>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {
                    hardSkills?.map((hardSkill, index) => (
                        <tr key={index}>
                            <td>{hardSkill.name}</td>
                            <td className={cl.buttons}>
                                <button onClick={() => handleClickChange(hardSkill)}><EditIcon /></button>
                                <button onClick={() => handleClickDelete(hardSkill.id)}><DeleteIcon /></button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            <ChangeModal
                onClose={changeHardSkillModal}
                open={changeModalOpen}
                oldValue={changingHardSkill?.name}
            />
            <ConfirmationModal
                onClose={handleOnCloseDeleteModal}
                open={deleteModalOpen}
            />
        </div>
    );
};

export default HardSkillList;

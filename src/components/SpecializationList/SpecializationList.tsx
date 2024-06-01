import Input from "../UI/Input/Input.tsx";
import cl from './SpecializationList.module.scss'
import {
    useAddSpecializationMutation,
    useChangeSpecializationMutation,
    useDeleteSpecializationMutation,
    useGetSpecializationsQuery
} from "../../store/api/criterionApi.ts";
import {useState} from "react";
import Loader from "../UI/Loader/Loader.tsx";
import PlusIcon from "../UI/Icons/PlusIcon.tsx";
import EditIcon from "../UI/Icons/EditIcon.tsx";
import DeleteIcon from "../UI/Icons/DeleteIcon.tsx";
import ChangeModal from "../UI/ChangeModal/ChangeModal.tsx";
import ConfirmationModal from "../UI/ConfirmationModal/ConfirmationModal.tsx";
import {HardSkill} from "../../models/response/HardSkill.ts";

const SpecializationList = () => {
    const { data: specializations, isLoading: getIsLoading } = useGetSpecializationsQuery();
    const [addSpecialization, { isLoading: addIsLoading }] = useAddSpecializationMutation();
    const [changeSpecialization, { isLoading: changeIsLoading }] = useChangeSpecializationMutation();
    const [deleteSpecialization, {isLoading: deleteIsLoading}] = useDeleteSpecializationMutation();

    const [specialization, setSpecialization] = useState('');
    const [changingSpecialization, setChangingSpecialization] = useState<HardSkill>();
    const [deletingSpecialization, setDeletingSpecialization] = useState<string>('');
    const [changeModalOpen, setChangeModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const handleAddSpecialization = async () => {
        await addSpecialization({ name: specialization });
        setSpecialization('');
    }

    const changeSpecializationModal = async (name: string | undefined) => {
        if(name && changingSpecialization){
            await changeSpecialization({id: changingSpecialization.id, name: name})
        }
        setChangeModalOpen(false)
    }

    const handleClickChange = (hardSkill: HardSkill) => {
        setChangingSpecialization(hardSkill)
        setChangeModalOpen(true);
    }

    const handleClickDelete = (id: string) => {
        setDeletingSpecialization(id);
        setDeleteModalOpen(true);
    }

    const handleOnCloseDeleteModal = async (decision: boolean) => {
        if(decision){
            await deleteSpecialization(deletingSpecialization);
        }
        setDeleteModalOpen(false)
    }

    if (getIsLoading || addIsLoading || changeIsLoading || deleteIsLoading) {
        return <Loader />;
    }

    return (
        <div className={cl.specializations}>
            <div className={cl.newItem}>
                <Input
                    style={{marginRight: '10px'}}
                    value={specialization}
                    onChange={(event) => setSpecialization(event.target.value)}
                    placeHolder={'Название'}
                />
                <button onClick={() => handleAddSpecialization()}><PlusIcon/></button>
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
                    specializations?.map((specialization, index) => (
                        <tr key={index}>
                            <td>{specialization.name}</td>
                            <td className={cl.buttons}>
                                <button onClick={() => handleClickChange(specialization)}><EditIcon/></button>
                                <button onClick={() => handleClickDelete(specialization.id)}><DeleteIcon/></button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            <ChangeModal
                onClose={changeSpecializationModal}
                open={changeModalOpen}
                oldValue={changingSpecialization?.name!}
            />
            <ConfirmationModal
                onClose={handleOnCloseDeleteModal}
                open={deleteModalOpen}
            />
        </div>
    );
};

export default SpecializationList;
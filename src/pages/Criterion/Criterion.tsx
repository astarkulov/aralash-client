import HardSkillList from "../../components/HardSkillList/HardSkillList.tsx";
import SpecializationList from "../../components/SpecializationList/SpecializationList.tsx";
import cl from './Criterion.module.scss'

const Criterion = () => {
    return (
        <div className={cl.criterion}>
            <div className={cl.item}>
                <h2>HardSkills:</h2>
                <HardSkillList/>
            </div>
            <div className={cl.item}>
                <h2>Specializations:</h2>
                <SpecializationList/>
            </div>
        </div>
    );
};

export default Criterion;
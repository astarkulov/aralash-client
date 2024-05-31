import cl from './Processing.module.scss'
import Button from "../../components/UI/Button/Button.tsx";
const processingResumes = [
    {
        name: "Иванов Иван Иванович",
        status: true
    },
    {
        name: "Иванов Иван Иванович",
        status: true
    },
    {
        name: "Иванов Иван Иванович",
        status: true
    },
    {
        name: "Яустал Очень Сильнович",
        status: false
    },
    {
        name: "Яустал Очень Сильнович",
        status: false
    },
]

const Processing = () => {
    return (
        <div className={cl.processing}>
            {
                processingResumes.map((item, index) =>
                    <div key={index} className={cl.item}>
                        {item.name}
                        <Button disabled={!item.status}>
                            {item.status ? 'Перейти к профилю' : 'В обработке'}
                        </Button>
                    </div>
                )
            }
        </div>
    );
};

export default Processing;
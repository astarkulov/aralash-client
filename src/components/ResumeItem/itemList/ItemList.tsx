import {FC, useState} from "react";
import cl from './ItemList.module.scss'

interface ItemListProps {
    title: string;
    items: string[]
}

const ItemList: FC<ItemListProps> = ({items, title}) => {
    const [showMore, setShowMore] = useState(false);
    const itemsLength = items?.reduce((total, str) => total + str.length, 0);
    const indexShowMore = findIndexUntilTargetLength(items, 110);
    console.log(itemsLength)
    return (
        <div className={cl.itemList}>
            <h3>{title}:</h3>
            <div className={cl.itemContainer}>
                {items.slice(0, indexShowMore).map((company, index) =>
                    <div key={index} className={cl.item}>{company}</div>
                )}
                {
                    showMore
                        ? items.slice(indexShowMore, items.length).map((company, index) =>
                            <div key={index} className={cl.item}>{company}</div>
                        )
                        : null
                }
                <button hidden={itemsLength < 50} className={cl.showMore}
                        onClick={() => setShowMore(!showMore)}>{showMore ? 'Скрыть' : 'Еще...'}</button>
            </div>
        </div>
    );
};

export default ItemList;

function findIndexUntilTargetLength(array, target) {
    let totalLength = 0;

    for (let i = 0; i < array.length; i++) {
        totalLength += array[i].length;
        if (totalLength >= target) {
            return i; // Возвращаем индекс, когда сумма достигает или превышает целевое значение
        }
    }

    return -1; // Возвращаем -1, если целевое значение не достигнуто
}
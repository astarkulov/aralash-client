import SearchIcon from "../UI/Icons/SearchIcon.tsx";
import cl from "./SearchBar.module.scss";
import {FC} from "react";

interface SearchBarProps {
    setFilter: (value: string) => void
}

const SearchBar:FC<SearchBarProps> = ({setFilter}) => {
    return (
        <div className={cl.searchBar}>
            <SearchIcon/>
            <input
                type="text"
                onChange={event => setFilter(event.target.value)}
                placeholder='Поиск по ФИО, специализации и т.д.'
                className={cl.search}
            />
        </div>
    );
};

export default SearchBar;
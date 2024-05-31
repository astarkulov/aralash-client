import cl from './Icons.module.scss'
const Search = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.66667 9.66667L14 14M6.05556 11.1111C3.26345 11.1111 1 8.84766 1 6.05556C1 3.26345 3.26345 1 6.05556 1C8.84766 1 11.1111 3.26345 11.1111 6.05556C11.1111 8.84766 8.84766 11.1111 6.05556 11.1111Z"
                className={cl.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
};

export default Search;
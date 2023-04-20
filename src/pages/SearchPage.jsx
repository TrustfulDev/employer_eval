import { useLocation } from 'react-router-dom';

const SearchPage = () => {
    const { state } = useLocation();

    return (
        <div>
            <h1>SEARCH PAGE</h1>
            <p>Your value is: {state.value}</p>
        </div>
    )
}

export default SearchPage;
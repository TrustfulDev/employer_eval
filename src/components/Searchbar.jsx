import { useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    /*if (searchInput.length > 0) {
    }*/

    const handleSubmit = () => {
        navigate('/search', { state: { value: searchInput }});
    }

    return (
        <form onSubmit={ handleSubmit } >

            <input
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput} 
                className='w-full rounded px-4 py-2.5 mt-8 bg-white text-gray-900'
            />

            <input type='submit' className='hidden' />
        </form>
)}

export default Searchbar;
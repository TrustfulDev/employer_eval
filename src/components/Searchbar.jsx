import { useState, useEffect, useRef } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const navigate = useNavigate();

    const autoCompleteRef = useRef();
    const inputRef = useRef();

    const options = {
        componentRestrictions: {country: "usa"},
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["establishment"]
    };

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
    },[])

    const handleSubmit = () => {
        navigate('/search', { state: { value: inputRef.current.value }});
    }

    return (
        <form onSubmit={ handleSubmit } >
            <input
                type="search"
                placeholder="Search here"
                className='w-full rounded px-4 py-2.5 my-8 bg-white text-gray-900'
                ref={inputRef}
            />

            <input type='submit' className='hidden' />
        </form>
)}

export default Searchbar;
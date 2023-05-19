import { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const navigate = useNavigate();
    const [isEmpty, setIsEmpty] = useState(false);

    const autoCompleteRef = useRef();
    const inputRef = useRef();

    const options = {
        componentRestrictions: {country: "us"},
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["(cities)"]
    };

    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputRef.current.value === "" || inputRef.current.value === undefined || inputRef.current.value === null) {
            setIsEmpty(true);
        } else {
            navigate('/search', { state: { value: inputRef.current.value }});
        }
    }

    return (
        <form onSubmit={ handleSubmit } className="my-8">
            <p className={ isEmpty ? "text-red-300" : "hidden"}>THIS FIELD CAN NOT BE LEFT EMPTY!</p>
            <input
                type="search"
                placeholder="Enter a city and state"
                className='w-full rounded px-4 py-2.5 bg-white text-gray-900'
                ref={inputRef}
            />

            <input type='submit' className='hidden' />
        </form>
)}

export default Searchbar;
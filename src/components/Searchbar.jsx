import { useEffect, useRef, useState } from 'react';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    // establishes variables that will be needed for component to function properly
    const navigate = useNavigate();
    const [isEmpty, setIsEmpty] = useState(false);
    const auth = getAuth();

    const autoCompleteRef = useRef();
    const inputRef = useRef();

    const options = { // options for autocomplete function from Google's Places API
        componentRestrictions: {country: "us"},
        fields: ["address_components", "geometry", "icon", "name"],
        types: ["(cities)"]
    };

    useEffect(() => { // useEffect for searchbar to update what can be autocompleted when user inputs places
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            inputRef.current,
            options
        );
    },[])

    const handleSubmit = (e) => { // when user submits it takes user input as data and passes the input information to the search page to display
        e.preventDefault();
        if (inputRef.current.value === "" || inputRef.current.value === undefined || inputRef.current.value === null) {
            setIsEmpty(true);
        } else {
            navigate('/search', { state: { value: inputRef.current.value }});
        }
    }

    return (
        <form onSubmit={ handleSubmit } className="my-8">
            <p className={ isEmpty ? "text-red-300" : "hidden"}>{ auth.currentUser === null ? "LOGIN TO SEARCH!" : "THIS FIELD CAN NOT BE LEFT EMPTY!"}</p>
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
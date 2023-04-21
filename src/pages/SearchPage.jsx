import { useLocation } from 'react-router-dom';
import {  mcdonalds } from "../assets";
import { SearchCard } from "../components";


const SearchPage = () => {
    const { state } = useLocation();

    return (
        <section className="px-5 py-5">
            <SearchCard img={mcdonalds} 
                alt="image of employer" 
                employer={"Mcdonalds"}
                address={"777 Story Rd"}
                score={"70"}                   
            />
        </section>
    )
}

export default SearchPage;
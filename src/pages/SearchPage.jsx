import { useLocation } from 'react-router-dom';
import { mcdonalds } from "../assets";
import { SearchCard } from "../components";


const SearchPage = () => {
    // const { state } = useLocation();

    return (
        <section>
            <h1>SEARCH PAGE</h1>
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